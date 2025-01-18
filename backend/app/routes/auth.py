from aiohttp import web
from app.database.models import User
from app.database.accessor import get_db_session

auth_route = web.RouteTableDef()

@auth_route.post('/create-temp-user')
async def create_temp_user(request: web.Request):
    data = await request.json()
    # username = data.get('username')
    # email = data.get('email')

    data = await request.json()
    print(data)
    name = data.get('name')
    email = data.get('mail')

    async with get_db_session(request.app) as session:
        new_user = User(name=name, email=email)
        session.add(new_user)

    response_data = {
        'id': new_user.id,
        'username': new_user.name,
        'email': new_user.email
    }

    return web.json_response({'data': response_data})
