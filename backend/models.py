from config import db
from sqlalchemy.sql import func
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
from sqlalchemy.orm import relationship

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

note_tag = db.Table('note_tag',
    db.Column('note_id', db.Integer, db.ForeignKey('note.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'), primary_key=True)
)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    title = db.Column(db.String(200), nullable=False)
    source = db.Column(db.String(200))
    body = db.Column(db.Text, nullable=False)

    tags = relationship('Tag', secondary=note_tag, backref=db.backref('notes', lazy='dynamic'))

    def to_json(self):
        return {
            "id": self.id,
            "createdAt": self.created_at.isoformat(),
            "title": self.title,
            "source": self.source,
            "tags": [tag.name for tag in self.tags],
            "body": self.body
        }
    
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)

    def __repr__(self):
        return f'<Tag {self.name}>'

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
    