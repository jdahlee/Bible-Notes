import { useState, useEffect } from "react";

const folderCircle = "rounded-full w-3 h-3 mr-3";
const folderStyling = "flex items-center py-2 border-b-[1px] border-black";
const filterDropdown =
  "w-5/6 mx-auto my-3 px-2 py-1 bg-white rounded border border-black";

function HomePage() {
  return (
    <>
      <div className="grid grid-cols-12">
        <div className="col-span-3 pt-3 pl-3 bg-gray-200 h-screen">
          <div className="text-center font-semibold pb-3">Folders</div>
          <div className={`${folderStyling}`}>
            <span className={`bg-red-400 ${folderCircle}`}></span>
            YG - Friday Nights
          </div>
          <div className={`${folderStyling}`}>
            <span className={`bg-blue-400 ${folderCircle}`}></span>
            YG - Sundays
          </div>
          <div className={`${folderStyling}`}>
            <span className={`bg-yellow-400 ${folderCircle}`}></span>
            Devotionals
          </div>
          <div className={`${folderStyling}`}>
            <span className={`bg-green-400 ${folderCircle}`}></span>
            Prayer Topics
          </div>
        </div>
        <div className="col-span-6 pt-3 bg-blue-100 h-screen">
          <div className="flex justify-around">
            <span>Judah's Notes</span>
            <span>Today's Date:</span>
          </div>
          <div className="mt-2 mx-auto bg-gray-200 h-96 w-11/12 rounded border-2 border-black p-3">
            <h1>Recent Notes</h1>
          </div>
          <div className="flex justify-center mt-2">
            <button>New Note</button>
          </div>
        </div>
        <div className="col-span-3 pt-3 bg-gray-200 h-screen">
          <div className="col-span-3 bg-gray-200 pb-3 h-screen">
            <div className="text-center font-semibold pb-3">Filters</div>
            <div className={`${filterDropdown}`}>Topic</div>
            <div className={`${filterDropdown}`}>Date</div>
            <div className={`${filterDropdown}`}>Source</div>
            <div className="flex justify-center mt-2">
              <button>Search</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
