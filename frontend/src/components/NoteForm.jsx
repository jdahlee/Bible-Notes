import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import TagSelector from "./TagSelector";

const NoteForm = () => {
  const [searchParams] = useSearchParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [queriedNote, setQueriedNote] = useState("");
  const [tagSelector, setTagSelector] = useState();
  const [currentPassage, setCurrentPassage] = useState({
    book: "",
    start: "",
    end: "",
  });

  const id = searchParams.get("id");

  useEffect(() => {
    fetchTagOptions();
  }, []);

  useEffect(() => {
    if (id) {
      fetchNoteById(id);
    }
  }, [id]);

  const fetchNoteById = async () => {
    const response = await fetch("http://localhost:5000/get_note/" + id);
    const data = await response.json();
    setQueriedNote(data.note);
  };

  const fetchTagOptions = async () => {
    const response = await fetch("http://localhost:5000/tags");
    const data = await response.json();
    setTagOptions(data.tags);
  };

  const fetchPassage = async () => {
    let passageUrl = currentPassage["book"] + "." + currentPassage["start"];
    if (currentPassage["end"]) {
      passageUrl += "." + currentPassage["end"];
    }
    const response = await fetch(
      "http://localhost:5000/get_passage/" + passageUrl
    );
    const data = await response.json();
    console.log(data);
    try {
      await window.navigator.clipboard.writeText(data.passage);
      setCurrentPassage((prevData) => ({
        ["book"]: "",
        ["start"]: "",
        ["end"]: "",
      }));
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  const handleInputChange = (key, value) => {
    setCurrentPassage((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  useEffect(() => {
    let tagSelect;
    if (tagOptions && tagOptions.length > 0) {
      tagSelect = (
        <TagSelector
          tagOptions={tagOptions}
          currentTag={currentTag}
          onTagChange={handleTagChange}
        />
      );
    }
    setTagSelector(tagSelect);
  }, [tagOptions]);

  const handleTagChange = (newTag) => {
    setCurrentTag(newTag);
  };

  useEffect(() => {
    setTitle(queriedNote.title);
    setBody(queriedNote.body);
    setSource(queriedNote.source);
    if (queriedNote.tags) {
      setTags(queriedNote.tags);
    }
  }, [queriedNote]);

  const handleAddTag = (e) => {
    e.preventDefault();
    if (currentTag.trim() !== "" && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      body,
      source,
      tags,
    };
    const url =
      "http://localhost:5000/" +
      (queriedNote ? `update_note/${id}` : "create_note");
    const options = {
      method: queriedNote ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        // Clear form after successful submission
        if (!queriedNote) {
          setTitle("");
          setBody("");
          setSource("");
          setTags([]);
        }
        queriedNote
          ? alert("Note updated successfully!")
          : alert("Note created successfully!");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while creating the note.");
    }
  };

  return (
    <>
      <div className="p-5 bg-sky-100 h-screen">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-12">
            <div className="col-span-4">
              <label htmlFor="title" className="mb-1">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title ?? ""}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded ml-2 mr-2 p-2 w-5/6"
                required
              />
            </div>
            <div className="col-span-3">
              <label htmlFor="source" className="mb-1">
                Source:
              </label>
              <input
                type="text"
                id="source"
                value={source ?? ""}
                onChange={(e) => setSource(e.target.value)}
                className="border rounded ml-2 p-2"
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex">
              <label htmlFor="tags" className="mb-1">
                Tags:
              </label>
              <span className="ml-2">{tagSelector}</span>
              <div className="flex items-center">
                <input
                  type="text"
                  id="tags"
                  value={currentTag ?? ""}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  className="border rounded p-2 flex-grow"
                />
                <button
                  onClick={handleAddTag}
                  type="button"
                  className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="ml-2 flex flex-wrap items-center">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-2 py-1 rounded mr-1 mb-1 h-fit flex items-center text-xs"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    type="button"
                    className="ml-2 text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="col-span-2 p-3">
              <label htmlFor="body" className="block">
                Body:
              </label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="border rounded p-2 min-h-96 w-full"
                required
              />
            </div>
            <div className="col-span-1 bg-gray-200 p-3 h-96">
              <h1 className="font-semibold text-center mb-2">Tools</h1>
              <div className="flex space-x-1 mb-2">
                <input
                  type="text"
                  id="passage-book"
                  value={currentPassage.book ?? "Book"}
                  placeholder={currentPassage.book ? "" : "Book"}
                  onChange={(e) => handleInputChange("book", e.target.value)}
                  className="border rounded p-2 w-48 h-14"
                />
                <input
                  type="text"
                  id="passage-start"
                  value={currentPassage.start ?? ""}
                  placeholder={currentPassage.start ? "" : "ch:ver"}
                  onChange={(e) => handleInputChange("start", e.target.value)}
                  className="border rounded p-2 w-16 h-14"
                />
                <div className="content-center font-bold text-lg">-</div>
                <input
                  type="text"
                  id="passage-end"
                  value={currentPassage.end ?? ""}
                  placeholder={currentPassage.end ? "" : "ch:ver"}
                  onChange={(e) => handleInputChange("end", e.target.value)}
                  className="border rounded p-2 w-16 h-14"
                />
              </div>
              <button
                onClick={fetchPassage}
                type="button"
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
              >
                Look Up
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {queriedNote ? "Update note" : "Create note"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NoteForm;
