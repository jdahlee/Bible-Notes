import React, { useState } from "react";

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [source, setSource] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");

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
    const url = "http://localhost:5000/create_note";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        // Clear form after successful submission
        setTitle("");
        setBody("");
        setSource("");
        setTags([]);
        alert("Note created successfully!");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("An error occurred while creating the note.");
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="source" className="mb-1">
            Source:
          </label>
          <input
            type="text"
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="body" className="mb-1">
            Body:
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="border rounded p-2 h-32"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags" className="mb-1">
            Tags:
          </label>
          <div className="flex items-center">
            <input
              type="text"
              id="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="border rounded p-2 flex-grow"
            />
            <button
              onClick={handleAddTag}
              type="button"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Tag
            </button>
          </div>
          <div className="mt-2 flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 px-2 py-1 rounded mr-2 mb-2 flex items-center"
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
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default NoteForm;
