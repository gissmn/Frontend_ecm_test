import React from "react";

export default function Button({ classes = "", title = "", handleClick = () => {}, prop }) {
  return (
    <button {...prop} className={`bg-primary text-white px-3 py-1 rounded-md hover:bg-blue-300 ${classes}`} onClick={handleClick}>
      {title}
    </button>
  );
}
