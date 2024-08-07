from config import db
from sqlalchemy.sql import func
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), unique=False, nullable=False) 
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "email": self.email,
        }

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    title = db.Column(db.String(200), nullable=False)
    source = db.Column(db.String(200))
    tags = db.Column(MutableList.as_mutable(PickleType), default=[])
    body = db.Column(db.Text, nullable=False)


    def to_json(self):
        return {
            "id": self.id,
            "createdAt": self.created_at.isoformat(),
            "title": self.title,
            "source": self.source,
            "tags": self.tags,
            "body": self.body
        }