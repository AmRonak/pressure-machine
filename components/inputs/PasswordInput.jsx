import React from "react";

const PasswordInput = () => {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 right-0 flex items-center px-2">
        <input className="hidden js-password-toggle" id="toggle" type="checkbox" />
        <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">show</label>
      </div>
      <input className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type="password" autocomplete="off"
      />
    </div>
  );
};

export default PasswordInput;
