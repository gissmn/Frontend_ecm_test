import React from "react";

export default function Button({ classes = "", title = "", handleClick = () => {} }) {
  return (
    <button className={`bg-primary text-white px-3 py-1 rounded-md hover:bg-blue-300 ${classes}`} onClick={handleClick}>
      {title}
    </button>
  );
}
