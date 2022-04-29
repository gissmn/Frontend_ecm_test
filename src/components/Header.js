import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-blue-800 h-10 flex items-center px-8 justify-between">
      <div>
        <a className="uppercase text-xl text-white font-bold hover:text-green-500" href="/">
          call center
        </a>
      </div>
      <div className="text-gray-100">
        <button className="btn bg-gray-600">login</button>
      </div>
    </header>
  );
}
