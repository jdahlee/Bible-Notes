import React, { useEffect, useState } from "react";

import TagSelector from "../components/TagSelector";

function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [notesList, setNotesList] = useState([]);
  const [tag, setTag] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [tagSelector, setTagSelector] = useState();

  useEffect(() => {
    fetchNotes();
    fetchTagOptions();
  }, []);

  const fetchNotes = async () => {
    const response = await fetch("http://localhost:5000/notes");
    const data = await response.json();
    setNotes(data.notes);
    setTag("");
  };

  const fetchTagOptions = async () => {
    const response = await fetch("http://localhost:5000/tags");
    const data = await response.json();
    setTagOptions(data.tags);
  };

  useEffect(() => {
    let tagSelect;
    if (tagOptions && tagOptions.length > 0) {
      tagSelect = (
        <TagSelector
          tagOptions={tagOptions}
          currentTag={tag}
          onTagChange={handleTagChange}
        />
      );
    }
    setTagSelector(tagSelect);
  }, [tagOptions, tag]);

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filterNotesByTag = async () => {
    const response = await fetch(
      "http://localhost:5000/filter_notes_tag/" + tag
    );
    const data = await response.json();
    setNotes(data);
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
          <div className="col-span-1">Date: {note.createdAt}</div>
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
      <div className="flex mt-3">
        <label className="">Tag:</label>
        {tagSelector}
        <button
          onClick={() => filterNotesByTag()}
          type="button"
          className="ml-2 bg-green-500 font-bold"
        >
          filter
        </button>
        <button
          onClick={() => fetchNotes()}
          type="button"
          className="ml-2 bg-green-500 font-bold"
        >
          reset
        </button>
      </div>
      <div className="p-5">{notesList}</div>
    </>
  );
}

export default NotesPage;
