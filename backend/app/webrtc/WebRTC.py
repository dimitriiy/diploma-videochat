from aiortc import RTCPeerConnection, RTCIceCandidate, RTCSessionDescription, MediaStreamTrack

class WebRTCConnection:
    def __init__(self, room: str, user: str, socket):
        self.peer = RTCPeerConnection()
        self.room = room
        self.user = user
        self.socket = socket

    async def addIceCandidate(self, candidate, sdpMid, sdpMLineIndex):
        candidate = candidate.split()
        new_ice = RTCIceCandidate(
            component=int(candidate[1]),
            foundation=candidate[0].split(":")[1],
            ip=candidate[4],
            port=int(candidate[5]),
            priority=int(candidate[3]),
            protocol=candidate[2],
            type=candidate[7],
            relatedAddress=None,
            relatedPort=None,
            sdpMid=sdpMid,
            sdpMLineIndex=int(sdpMLineIndex),
            tcpType=None
        )

        await self.peer.addIceCandidate(new_ice)

    async def apply_offer(self, sdp: str, type: str):
        offer = RTCSessionDescription(sdp, type)
        await self.peer.setRemoteDescription(offer)

    async def createOffer(self):
        offer = await self.peer.createOffer()
        await self.peer.setLocalDescription(offer)
        return  offer

    async def createAnswer(self, sdp: str, type: str):
        await self.apply_offer(sdp,type)

        answer = await self.peer.createAnswer()
        await self.peer.setLocalDescription(answer)

        return self.peer.localDescription

    def getSenders(self):
        return self.peer.getSenders()

    @property
    def connectionState(self):
        return self.peer.connectionState

    def addTrack(self, track: MediaStreamTrack):
        return self.peer.addTrack(track)
