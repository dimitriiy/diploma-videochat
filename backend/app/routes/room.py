import json

from aiohttp import web
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.inspection import inspect

from app.database.models import Room, Participant,User
from app.database.accessor import get_db_session
from app.database.serialize import model_to_dict

room_route = web.RouteTableDef()

async def get_all_users_by_room(session, room_id):
    stmt = select(User).join(Participant).where(Participant.room_id == room_id)

    result = await session.execute(stmt)

    users = result.scalars().all()
    return users

@room_route.post('/create-room')
async def create_root(request: web.Request):
    data = await request.json()
    host_id = data.get('host_id')

    async with get_db_session(request.app) as session:
        new_room = Room(name='Room name',host_id=host_id, settings={})
        session.add(new_room)


    response_data = {
        'id': new_room.id,
        'name': new_room.name,
        'host_id': new_room.host_id,
        'settings':new_room.settings
    }

    return web.json_response({'data': response_data})


async def add_participant_if_not_exists(async_session: AsyncSession, user_id: int, room_id: int):
    # Проверяем, существует ли уже Participant
    stmt = select(Participant).where(
        Participant.user_id == user_id,
        Participant.room_id == room_id
    )
    result = await async_session.execute(stmt)
    participant = result.scalars().first()

    if not participant:
        # Если не существует, создаём новую запись
        new_participant = Participant(user_id=user_id, room_id=room_id)
        async_session.add(new_participant)
        try:
            await async_session.commit()
            print("Participant добавлен.")
        except Exception as e:
            await async_session.rollback()
            print(f"Ошибка при добавлении Participant: {e}")
    else:
        print("Participant уже существует.")

    return participant


@room_route.post('/join-room')
async def create_root(request: web.Request):
    data = await request.json()
    print(data)
    user_id = data.get('user_id')
    room_id = data.get('room_id')

    async with get_db_session(request.app) as session:
        new_participant = await add_participant_if_not_exists(session, user_id, room_id)

    async with get_db_session(request.app) as session:
        users_in_room = await get_all_users_by_room(session,room_id)
        stmt = select(Room).where(Room.id==room_id)
        result = await session.execute(stmt)

        room = result.scalars().first()


    users = [(model_to_dict(user)) for user in users_in_room]
    response_data = {
        'room': (model_to_dict(room)),
        'users': users
    }

    return web.json_response({'data': response_data})
