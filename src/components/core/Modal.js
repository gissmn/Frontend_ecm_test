import React from "react";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";
export default function Modal({ onClose = () => {}, title = "", child = <></> }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen h-screen">
      <div className=" z-20 max-h-8/10 max-w-8/10 flex flex-col">
        <div className="flex justify-between bg-blue-700 text-white px-4 py-2 items-center">
          <p>{title}</p>
          <CloseIcon className="w-8 cursor-pointer" onClick={onClose} />
        </div>
        <div className="p-4 bg-gray-50 overflow-auto ">{child}</div>
      </div>
      <div className="absolute inset-0 bg-gray-900 z-10 opacity-70" onClick={onClose}></div>
    </div>
  );
}
