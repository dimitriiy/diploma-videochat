from typing import TypedDict

from aiohttp.web_ws import WebSocketResponse

from app.webrtc.CoordinatorClass import CoordinatorClass


class App(TypedDict):
    coordinator: CoordinatorClass
    websockets: dict[str, WebSocketResponse]