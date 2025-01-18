from aiohttp import web
from app.WebSocketController import ws_route
from app.ChatController import chat_route
from app.routes.room import room_route
from app.database.accessor import get_db_session
from app.database.models import User,Room
from sqlalchemy.engine.reflection import Inspector
from sqlalchemy import text, select
import json

from app.routes.auth import auth_route

routes = web.RouteTableDef()

@routes.get('/all')
async def list_tables(request: web.Request) -> web.Response:
    async with get_db_session(request.app) as session:
        # SQL-запрос для получения имен таблиц из information_schema
        result = await session.execute(text("""
                   SELECT table_name 
                   FROM information_schema.tables 
                   WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
               """))
        tables = [row[0] for row in result.fetchall()]
        print('result',tables)

        result = {}

        for table in tables:
            rows = await get_all_tables_data(request.app,table)
            result[table] = rows

        print('result',result)
        json_string = json.dumps(result)
        return web.json_response({'tables': json_string})


async def get_all_tables_data(app, table_name):
    async with get_db_session(app) as session:
        print('table_name',table_name)
        result = await session.execute(text(f"""
            SELECT *
            FROM {table_name}
        """))

        columns = result.keys()
        rows = [dict(zip(columns, row)) for row in result.fetchall()]
        if table_name == 'messages':
            for row in rows:
                print('p', row['timestamp'])
                row['timestamp'] = str(row['timestamp'])
            print('xxx',rows)
        # print('rowsrowsrows',rows)

        return rows




@routes.get('/')
async def index(request):
    return web.FileResponse('./index.html')


@routes.post('/create_user')
async def create_user(request):
    data = await request.json()
    print(data)
    name = data.get('username')
    email = data.get('email')

    async with get_db_session(request.app) as session:
        new_user = User(name=name, email=email)
        session.add(new_user)
        await session.commit()

    return web.json_response({'message': 'User created successfully'})

@routes.post('/create_room')
async def create_user(request):
    data = await request.json()
    print(data)
    name = data.get('name')
    settings = data.get('settings')
    host_id = data.get('host_id')

    async with get_db_session(request.app) as session:
        new_user = Room(name=name, settings=settings,host_id=host_id)
        session.add(new_user)
        await session.commit()

    return web.json_response({'message': 'Room created successfully'})



def setup_routes(app: web.Application) -> None:
    # app.add_routes([web.get('/ws/webrtc/{id}', WebSocketController().main)])
    app.router.add_routes(routes)
    app.router.add_routes(ws_route)
    app.router.add_routes(chat_route)
    app.router.add_routes(auth_route)
    app.router.add_routes(room_route)


