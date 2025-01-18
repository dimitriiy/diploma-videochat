import sqlalchemy as sa
from collections import defaultdict
from aiohttp import web

from app.add_cors import add_cors
from app.database.accessor import PostgresAccessor
from app.webrtc.CoordinatorClass import CoordinatorClass
from app.routes.setup_routes import setup_routes


def init_data(app: web.Application):
    app['active_sockets'] = defaultdict(dict)
    app['coordinator'] = CoordinatorClass()
    app['sockets'] = defaultdict(dict)


def setup_accessors(application):
    application['db'] = PostgresAccessor()
    application['db'].setup(application)

def setup_app(app: web.Application):
    setup_routes(app)
    add_cors(app)
    setup_accessors(app)


def create_app():
    app = web.Application()
    init_data(app)
    setup_app(app)
    return app

