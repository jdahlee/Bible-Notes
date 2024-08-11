import React from "react";

const TopBar = ({ ...props }) => {
  return (
    <>
      <div className="flex bg-blue-200 p-2">
        <a href="/" className="mr-3">
          Home
        </a>
        <a href="/notes" className="mr-3">
          Profile
        </a>
        <a href="/note-form">Note Form</a>
      </div>
    </>
  );
};

export default TopBar;
