import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-blue-800 h-10 flex items-center px-8 justify-between">
      <div>
        <a className="uppercase text-xl text-white font-bold hover:text-green-500" href="/">
          call center
        </a>
      </div>
      <div className="text-gray-100">
        <Link to="/login" className="btn">
          login
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="btn">
          logout
        </button>
      </div>
    </header>
  );
}
