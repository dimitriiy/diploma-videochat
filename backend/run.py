from main import create_app
from aiohttp import web

if __name__ == '__main__':
    app = create_app()
    web.run_app(app, port=4000)  # запускаем наше приложение
