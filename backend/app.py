from flask import Flask, render_template, redirect, url_for, request, jsonify, send_file
from config import app, db
from models import User, Note
import os

@app.route("/notes", methods=["GET"])
def get_notes():
    notes = Note.query.all()
    json_notes = list(map(lambda x: x.to_json(), notes))
    return jsonify({"notes": json_notes})

@app.route("/create_note", methods=["POST"])
def create_note():
    title = request.json.get("title")
    body = request.json.get("body")
    source = request.json.get("source")
    tags = request.json.get("tags", [])
    
    if not title or not body:
        return jsonify({"message": "You must include a title and body"}), 400
    
    new_note = Note(
        title=title,
        body=body,
        source=source,
        tags=tags
    )
    
    try:
        db.session.add(new_note)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Note created", "note": new_note.to_json()}), 201

@app.route("/update_note/<int:note_id>", methods=["PATCH"])
def update_note(note_id):
    note = Note.query.get(note_id)

    if not note:
        return jsonify({"message": "Note not found"}), 404
    
    data = request.json
    note.title = data.get("title", note.title)
    note.body = data.get("body", note.body)
    note.source = data.get("source", note.source)
    note.tags = data.get("tags", note.tags)

    db.session.commit()

    return jsonify({"message": "Note updated." }), 200

@app.route("/delete_note/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    note = Note.query.get(note_id)

    if not note:
        return jsonify({"message": "Note not found"}), 404
    
    db.session.delete(note)
    db.session.commit()

    return jsonify({"message": "Note deleted!"}), 200

@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = list(map(lambda x: x.to_json(), users))
    return jsonify({"users": json_users})


@app.route("/create_user", methods=["POST"])
def create_user():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    if not first_name or not last_name or not email:
        return (jsonify({"message": "You must include a first name, last name and email"}), 400, )
    
    new_user = User(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return (jsonify({"message": str(e)}), 400)
    
    return jsonify({"message": "User created"}), 201

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    data = request.json
    user.first_name = data.get("firstName", user.first_name)
    user.last_name = data.get("lastName", user.last_name)
    user.email = data.get("email", user.email)

    db.session.commit()

    return jsonify({"message": "User updated." }), 200

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200

@app.route("/")
def home():
    return render_template("home.html")

@app.route('/output.css')
def output_css():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    file_path = os.path.join(root_dir, 'output.css')
    return send_file(file_path)


if __name__ == "__app__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
