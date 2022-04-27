import React from "react";

export default function LabelInput({ label = "", input = <></> }) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{label}:</label>
      {input}
    </div>
  );
}
