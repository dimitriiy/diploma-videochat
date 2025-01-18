from aiortc import MediaStreamTrack
from aiortc.contrib.media import MediaRelay

from app.webrtc.WebRTC import WebRTCConnection
from typing import Literal
import asyncio

class Room:
    def __init__(self, id: str):
        self.id = id
        self.connections: dict[str, WebRTCConnection] = dict()
        self.producers: dict[str, WebRTCConnection] = dict()
        self.consumers: dict[str, WebRTCConnection] = dict()
        self.tracks: dict[str, MediaStreamTrack] = dict()
        self.received_relay = MediaRelay()
        self.mutex = asyncio.Lock()

    async def add_producer_peer(self, user: str, connection: WebRTCConnection):
        async with self.mutex:
            self.producers[user] = connection

    async def add_consumer_peer(self, user: str, connection: WebRTCConnection):
        async with self.mutex:
            self.consumers[user] = connection

    async def remove_user_tracks(self, user_id: str):
        async with self.mutex:
            if user_id in self.tracks:
                del self.tracks[user_id]

    async def remove_connection(self, user: str, type: Literal['producer', 'consumer'] = None):
        async with self.mutex:
            if user in self.tracks:
                del self.tracks[user]
            elif type is None or type == 'producer':
                if not user in self.producers:
                    return

                await self.producers[user].peer.close()
                del self.producers[user]
            elif  type is None or type == 'consumer':
                if not user in self.consumers:
                    return

                await self.consumers[user].peer.close()
                del self.consumers[user]

    def addTrack(self, user_id: str, track: MediaStreamTrack):
        relayed_track = self.received_relay.subscribe(track)

        if user_id not in self.tracks:
            self.tracks[user_id] = []
        self.tracks[user_id].append(relayed_track)
