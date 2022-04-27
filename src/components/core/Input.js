import React from "react";

export default function Input({ type = "text", classes = "", name }) {
  return <input className={`border ${classes}`} type={type} name={name} />;
}
