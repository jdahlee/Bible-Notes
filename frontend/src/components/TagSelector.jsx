import React from "react";

const TagSelector = ({ tagOptions, currentTag, onTagChange }) => {
  return (
    <div className="p-4">
      <select
        value={currentTag}
        onChange={(e) => onTagChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled hidden>
          {currentTag || "Select a tag"}
        </option>
        {tagOptions.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagSelector;
