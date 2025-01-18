from app.webrtc.Room import Room

class CoordinatorClass:
    def __init__(self):
        self.rooms: dict[str, Room] = dict()

    def create_room(self, room_id: str):
        if not room_id in self.rooms:
            self.rooms[room_id] = Room(room_id)

    def remove_room(self, room_id: str):
        if room_id in self.rooms:
            del self.rooms[room_id]
