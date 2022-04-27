import React, { useState } from "react";
import CallDetail from "../components/modal/CallDetail";
import { ReactComponent as LoadingIcon } from "../assets/icons/loading.svg";
import { ReactComponent as DotsIcon } from "../assets/icons/dots.svg";
export default function CallTable({ calls = [], loading, error }) {
  const [selectedCall, setSelectedCall] = useState(null);

  return (
    <>
      <table className="table-fixed   px-10 text-sm text-center">
        <thead className="bg-gray-400">
          <tr className="text-xs">
            <th className="border ">Дуудлагын дугаар</th>
            <th className="border ">Дуудлага өгсөн хэлбэр</th>
            <th className="border ">Дуудлагын төрөл</th>
            <th className="border ">Хаяг</th>
            <th className="border ">Бүртгэсэн ажилтан</th>
            <th className="border ">Ажлын нэр</th>
            <th className="border ">Агуулга</th>
            <th className="border ">Салбар</th>
            <th className="border ">Төлөв</th>
            <th className="border ">Төлбөр</th>
            <th className="border ">Шийдвэрлэх огноо</th>
            <th className="border ">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="">
          {loading ? (
            <tr className="">
              <td colSpan={"12"} className="text-center h-full text-blue-700 text-lg font-bold">
                <LoadingIcon className="fill-current inline-flex w-20 h-20 animate-spin" /> Loading ...
              </td>
            </tr>
          ) : error ? (
            <tr className="">
              <td colSpan={"12"} className="text-center h-full text-blue-700 text-lg font-bold">
                <span className="text-red-600">{error.message}</span>
              </td>
            </tr>
          ) : (
            <>
              {calls.map((e, i) => (
                <tr className="table-row cursor-pointer hover:bg-blue-300 max-h-2" key={i} onClick={() => setSelectedCall(e)}>
                  <td className="">{e.callId.toString().padStart(5, "0")}</td>
                  <td className="">{e.device}</td>
                  <td className="">{e.type}</td>
                  <td className="">{e.address}</td>
                  <td className="">{e.operator}</td>
                  <td className="truncate">{e.name}</td>
                  <td className=" truncate max-w-[200px]">{e.detail}</td>
                  <td className="">{e.branch}</td>
                  <td className="">{e.status}</td>
                  <td className="">{e.price}</td>
                  <td className="">{e.dueDate}</td>
                  <td className="flex items-center justify-center">
                    <button
                      className="text-gray-500 hover:text-white"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}>
                      <DotsIcon className="w-6" />
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {selectedCall && <CallDetail callInfo={selectedCall} onClose={() => setSelectedCall(null)} />}
    </>
  );
}
