import random
import json
import asyncio

from aiohttp import web

from app.webrtc.WebRTC import WebRTCConnection
from app.get_random_name import get_random_name
from app.types import App

ws_route = web.RouteTableDef()

@ws_route.get('/ws/webrtc/{id}')
class WebSocketController(web.View):
    mutex = asyncio.Lock()
    request: web.Request
    socket: web.WebSocketResponse

    async def get(self):
        request = self.request
        ws = web.WebSocketResponse()
        await ws.prepare(request)
        self.socket = ws
        room_id = request.match_info['id']
        user = f'User{random.randint(0, 999999)}'
        request.app['active_sockets'][user] = ws
        self.user = user
        await self.sendToCurrent(request, ws,
                                 {'type': 'auth', 'data': {'room_id': room_id, 'id': user, 'name': get_random_name()}})

        async for msg in ws:
            if msg.type == web.WSMsgType.TEXT:
                if msg.data == 'close':
                    print('close')
                    await ws.close()
                else:
                    await self.ws_message_handler(request, ws, msg)
            elif msg.type == web.WSMsgType.ERROR:
                print('ws connection closed with exception %s' %
                      ws.exception())

        if ws.closed:
            print('ws closed')
            app: App = request.app
            request.app['active_sockets'].pop(user)

            if room_id in app['coordinator'].rooms:
                await app['coordinator'].rooms[room_id].remove_connection(user, 'producer')
                await app['coordinator'].rooms[room_id].remove_connection(user, 'consumer')

        print('websocket connection closed1', request.app['active_sockets'])

        return ws

    async def sendToCurrent(self, request: web.Request, ws: web.WebSocketResponse, data):
        await ws.send_json(data)

    async def sendOthers(self, request: web.Request, ws: web.WebSocketResponse, data):
        app: App = request.app

        for ws_item in app['active_sockets'].values():
            if not ws_item.closed and ws_item != ws:
                await ws_item.send_json(data)

    async def ws_message_handler(self, request, ws, msg):
        data = json.loads(msg.data)
        event_type = data.get('type')

        if event_type == 'renegotiate_consumer_answer':
            await self.renegotiate_consumer_answer(request, ws, data)

        if event_type == 'create_sender_transport_answer':
            await self.create_sender_transport_answer(request, ws, data)

        if event_type == 'user_offer':
            await self.user_offer_handler(request, ws, data)

        if event_type == 'ice':
            await self.on_ice_candiate(request, data)

    async def create_sender_transport_answer(self, request: web.Request, ws: web.WebSocketResponse, data):
        app: App = request.app
        user_id = data.get('id')
        room_id = data.get('roomId')
        data = data.get('data')
        room = app['coordinator'].rooms[room_id]
        await  room.consumers[user_id].apply_offer(data.get('sdp'), data.get('type'))

    async def renegotiate_consumer_answer(self, request: web.Request, ws: web.WebSocketResponse, data):
        app: App = request.app
        room_id = data.get('roomId')
        user_id = data.get('id')
        room = app['coordinator'].rooms[room_id]
        offer_data = data.get('data')
        remote_sdp = offer_data.get('sdp')
        remote_type = offer_data.get('type')

        await room.consumers[user_id].apply_offer(remote_sdp, remote_type)

    async def user_offer_handler(self, request: web.Request, ws, data):
        app: App = request.app
        user_id = data.get('id')
        room_id = data.get('roomId')
        offer_data = data.get('data')
        remote_sdp = offer_data.get('sdp')
        remote_type = offer_data.get('type')

        if not room_id in app['coordinator'].rooms:
            app['coordinator'].create_room(room_id)

        room = app['coordinator'].rooms[room_id]
        webRTCConnection = WebRTCConnection(room_id, user_id, ws)
        await room.add_producer_peer(user_id, webRTCConnection)

        @webRTCConnection.peer.on('track')
        async def on_track(track):
            room.addTrack(user_id, track)

        async def clear_current_connection():
            async with self.mutex:
                try:
                    # await room.remove_connection(user_id)
                    print('main clearign')
                    for track in room.tracks[user_id]:
                        print('xx', track)
                    # await self.all_re(request,ws, user_id, room_id)

                    print('Produer removing....', user_id, room.consumers, room.tracks)

                except Exception as e:
                    print('Produer removing error ....', e)

        @webRTCConnection.peer.on('connectionstatechange')
        async def on_connectionstatechange():
            print("Producer Connection state is %s" % webRTCConnection.peer.connectionState)
            if webRTCConnection.peer.connectionState == 'connected':
                print('producer connected', user_id, room)

                await self.create_sender_transport(request, ws, room_id, user_id)
                await self.notify_new_user(request, ws, user_id, room_id)

            if webRTCConnection.peer.connectionState == "closed" or webRTCConnection.peer.connectionState == "failed":
                print('Producer closed', user_id)
                await clear_current_connection()

        answer = await webRTCConnection.createAnswer(remote_sdp, remote_type)
        await self.sendToCurrent(request, ws,
                                 {'type': 'user_answer', 'data': {'sdp': answer.sdp, "type_sdp": answer.type}})

    async def notify_user_left(self, request, ws, user_id, tracksId):
        # await self.remove_user_stream(request, ws, user_id)
        await self.sendOthers(request, ws, {'type': 'user_left', "data": {'id': user_id, 'tracksId': tracksId}})

    async def create_sender_transport(self, request, ws, room_id, user_id):
        app: App = request.app
        room = app['coordinator'].rooms[room_id]

        webRTCConnection = WebRTCConnection(room_id, user_id, ws)
        await room.add_consumer_peer(user_id, webRTCConnection)
        webRTCConnection.peer.createDataChannel('test')
        print('create_sender_transport', room.consumers)
        for userId, tracks in room.tracks.items():
            if userId != user_id:
                for track in tracks:
                    webRTCConnection.addTrack(track)

        @webRTCConnection.peer.on('connectionstatechange')
        async def on_connectionstatechange():
            print("Outcome Connection state is %s" % webRTCConnection.peer.connectionState)
            if webRTCConnection.peer.connectionState == 'connected':
                pass

            if webRTCConnection.peer.connectionState == "closed" or webRTCConnection.peer.connectionState == "failed":
                print(' outcome_connections closed', user_id)
                # await clear_current_connection()

        offer = await webRTCConnection.peer.createOffer()
        await webRTCConnection.peer.setLocalDescription(offer)

        print('....senging', user_id)
        await self.sendToCurrent(request, webRTCConnection.socket,
                                 {'type': 'create_sender_transport_offer',
                                  'data': {'sdp': webRTCConnection.peer.localDescription.sdp,
                                           "sdp_type": webRTCConnection.peer.localDescription.type}})

    async def notify_new_user(self, request, ws, user_id, room_id):
        app: App = request.app

        room = app['coordinator'].rooms[room_id]
        print('notify_new_user', user_id, room.tracks[user_id])
        async with self.mutex:
            try:

                for userId, peer_connection in room.consumers.items():
                    if userId == user_id:
                        continue
                    existing_track_ids = {s.track.id for s in peer_connection.getSenders() if s.track}

                    print('existing_track_ids', existing_track_ids)
                    for track in room.tracks[user_id]:
                        print('±±±±addtrackiii', track, track.id)
                        peer_connection.addTrack(track)
                    print('start renegotiate_consumer', userId)
                    await self.renegotiate_consumer(request, peer_connection.socket, peer_connection)
            except Exception as e:
                print('error notify_new_user', e)

            await self.sendOthers(request, ws, {'type': "new_user"})

    async def renegotiate_consumer(self, request, ws, webRTCConnection: WebRTCConnection):
        offer = await webRTCConnection.createOffer()

        # await self.wait_for_ice(peer)
        print('Renegotiating with offer:', )

        await self.sendToCurrent(request, ws, {
            'type': 'renegotiate_consumer',
            'data': {
                'sdp': offer.sdp,
                'type_sdp': offer.type
            }
        })

    async def wait_for_connection(self, webRTCConnection: WebRTCConnection):
        while True:
            if webRTCConnection.peer.connectionState == 'connected':
                break
            await asyncio.sleep(1)


async def wait_for_ice(self, peer: WebRTCConnection):
    while True:
        await asyncio.sleep(1)
        if peer.peer.iceGatheringState == 'complete':
            break


async def on_ice_candiate(self, request, data):
    rooms = request.app['rooms']
    user_id = data.get('id')
    room_id = data.get('roomId')
    candidate = data.get('data').get('candidate')
    sdpMid = data.get('data').get("sdpMid")
    sdpMLineIndex = int(data.get('data').get("sdpMLineIndex"))

    await rooms.connections[room_id][user_id].addIceCandidate(candidate, sdpMid, sdpMLineIndex)
