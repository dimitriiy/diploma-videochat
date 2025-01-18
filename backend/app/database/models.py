from sqlalchemy import Column, Integer, String,ForeignKey,TIMESTAMP,text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB, insert,UUID
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(), unique=True)
    email = Column(String(100))
    password_hash = Column(String)

    rooms = relationship("Room", back_populates="host")  # Связь с комнатами
    messages = relationship("Message", back_populates="user")  # Связь с комнатами


class Room(Base):
    __tablename__ = 'rooms'

    id = Column(Integer, primary_key=True)
    name = Column(String())
    settings = Column("data", JSONB)
    host_id = Column(Integer, ForeignKey('users.id'))  # Внешний ключ на пользователя

    host = relationship("User", back_populates="rooms")



class Message(Base):
    __tablename__ = 'messages'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    room_id = Column(Integer, ForeignKey('rooms.id'))

    content = Column(String())
    created_at = Column(String)

    user = relationship("User", back_populates="messages")


class Participant(Base):
    __tablename__ = 'participants'

    user_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    room_id = Column(Integer, ForeignKey('rooms.id'), primary_key=True)








