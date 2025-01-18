import random
import json
import asyncio
from sqlalchemy.orm import joinedload,selectinload

from aiohttp import web
from sqlalchemy import select

from app.database.accessor import get_db_session
from app.database.models import Message, User
import datetime

from app.database.serialize import model_to_dict

chat_route = web.RouteTableDef()


@chat_route.get('/ws/chat/{id}')
class ChatController(web.View):
    mutex = asyncio.Lock()
    request: web.Request
    socket: web.WebSocketResponse
    room_id: str

    async def get(self):
        request = self.request
        ws = web.WebSocketResponse()
        await ws.prepare(request)
        self.socket = ws
        room_id = request.match_info['id']
        self.room_id = room_id

        async with self.mutex:
            if not self.request.app['sockets'][room_id]:
                self.request.app['sockets'][room_id] = []

            self.request.app['sockets'][room_id].append(ws)

        async for msg in ws:
            if msg.type == web.WSMsgType.TEXT:
                if msg.data == 'close':
                    await ws.close()
                else:
                    await self.message_handler(msg)
            elif msg.type == web.WSMsgType.ERROR:
                print('ws connection closed with exception %s' %
                      ws.exception())

        if ws.closed:
            async with self.mutex:
                self.request.app['sockets'][room_id].pop(ws)

        return ws

    async def message_handler(self, msg):
        data = json.loads(msg.data)
        event_type = data.get('type')
        payload = data.get('data')

        if event_type == 'init_chat':
            await self.init_chat()
        if event_type == 'message_send':
            await self.new_message_handler(payload)

    async def init_chat(self):
        async with get_db_session(self.request.app) as session:
            stmt = select(Message).where(Message.room_id == int(self.room_id)).options(selectinload(Message.user))
            result = await session.execute(stmt)
            messages_in_room = result.scalars().all()


        messages = [model_to_dict(message) for message in messages_in_room]

        await self.socket.send_json({'type': 'init_chat_answer', 'data': {'messages': messages}})

    async def new_message_handler(self, payload):
        message_content = payload.get('content')
        user_id = payload.get('user_id')
        room_id = payload.get('room_id')

        async with get_db_session(self.request.app) as session:
            new_message = Message(user_id=user_id, room_id=room_id, content=message_content,
                                  created_at=datetime.datetime.now(datetime.UTC))
            session.add(new_message)

        new_message.created_at = datetime.datetime.now().isoformat()
        await self.broadcast_message({'type': 'new_message', 'data': model_to_dict(new_message)})

    async def broadcast_message(self, message):
        for ws_socket in self.request.app['sockets'][self.room_id]:
            print(self.socket == ws_socket)
            if not ws_socket.closed:
                await ws_socket.send_json(message)
