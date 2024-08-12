import React, { useEffect, useState } from "react";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [notesList, setNotesList] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch("http://localhost:5000/notes");
    const data = await response.json();
    setNotes(data.notes);
  };

  const onDelete = async (id) => {
    try {
      const options = {
        method: "DELETE",
      };
      const response = await fetch(
        `http://localhost:5000/delete_note/${id}`,
        options
      );
      if (response.status === 200) {
        alert("Note deleted successfully");
      } else {
        console.error("Failed to delte");
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    generateNotesList();
  }, [notes]);

  const generateNotesList = () => {
    let notesList = notes.map((note) => (
      <div key={note.id}>
        <div className="grid grid-cols-6">
          <div className="col-span-1">Title: {note.title}</div>
          <div className="col-span-1">Source: {note.source}</div>
          <div className="col-span-1">Tags: {note.tags}</div>
        </div>
        <div>Body: {note.body}</div>
        <div className="flex mt-3">
          <button
            onClick={() => onDelete(note.id)}
            className="bg-red-500 text-white px-2 py-1 rounded mr-5"
          >
            Delete
          </button>
          <a href={`/Note-form?id=${note.id}`}>Link</a>
        </div>
      </div>
    ));
    setNotesList(notesList);
  };

  return (
    <>
      <h1 className="bg-red-400">Notes Page</h1>
      <div className="p-5">{notesList}</div>
    </>
  );
}

export default NotesPage;
