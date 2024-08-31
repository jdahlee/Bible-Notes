import React from "react";

const SourceSelector = ({ sourceOptions, currentSource, onSourceChange }) => {
  return (
    <div className="p-4">
      <select
        value={currentSource}
        onChange={(e) => onSourceChange(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="" disabled hidden>
          {currentSource || "Select a source"}
        </option>
        {sourceOptions.map((source) => (
          <option key={source} value={source}>
            {source}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SourceSelector;
