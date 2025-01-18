from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession

import sqlalchemy as sa
from aiopg.sa import create_engine
from aiohttp import web
from sqlalchemy.orm import sessionmaker
from sqlalchemy.schema import CreateTable
from app.database.models import Base
from sqlalchemy import MetaData

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost/postgres"


class PostgresAccessor:
    def __init__(self) -> None:

        self.db = None

    def setup(self, application: web.Application) -> None:
        application.on_startup.append(self._on_connect)
        application.on_cleanup.append(self._on_disconnect)

    async def _on_connect(self, app: web.Application):
        engine = create_async_engine(DATABASE_URL, echo=True)
        self.db = engine
        app['pg_engine'] = engine
        Session = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
        app['db_session'] = Session
        metadata = MetaData()
        app['metadata'] = metadata
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)

        print('connected')


    async def _on_disconnect(self, _) -> None:
        await self.db.dispose()
        await self.db.wait_closed()


@asynccontextmanager
async def get_db_session(app):
    async with app['db_session']() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise