import React, { useState } from "react";

const Dropdown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleClick = () => {
    setIsDropDownOpen(!isDropDownOpen);
  }

  return (
    <div>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-primary p-4 rounded-3xl"
        type="button"
        onClick={handleClick}
      >
        Dropdown button
      </button>
      {
        isDropDownOpen && (
          <div
            id="dropdown"
            className="z-10 relative bg-white divide-y  rounded-lg shadow w-44"
          >
            <ul className="py-2" aria-labelledby="dropdownDefaultButton">
              <li>
                <a className="block px-4 py-2">Dashboard</a>
              </li>
              <li>
                <a className="block px-4 py-2">Settings</a>
              </li>
              <li>
                <a className="block px-4 py-2">Earnings</a>
              </li>
              <li>
                <a className="block px-4 py-2">Sign out</a>
              </li>
            </ul>
          </div>
        )
      }

    </div>);
};

export default Dropdown;
