import React, { useState } from "react";
import CallDetail from "../components/modal/CallDetail";
import { ReactComponent as LoadingIcon } from "../assets/icons/loading.svg";
import { ReactComponent as DotsIcon } from "../assets/icons/dots.svg";
import { WebIcon, UserIcon, PhoneIcon, MobileIcon, OfficeIcon } from "../assets/imgExports";
import getTime from "../helper/getTime";
export default function CallTable({ calls = [], loading, error }) {
  const [selectedCall, setSelectedCall] = useState(null);

  return (
    <>
      <table className="table-fixed border-separate px-4 borderSpacing text-sm text-center">
        <thead>
          <tr className="text-xs bg-gray-300 child:py-4 child:px-1 rounded-xl">
            <th className="rounded-l-lg">№</th>
            <th>device</th>
            <th>Дуудлагын төрөл</th>
            <th>Хаяг</th>
            <th>Бүртгэсэн ажилтан</th>
            <th>Ажлын нэр</th>
            <th>Агуулга</th>
            <th>Салбар</th>
            <th>Төлөв</th>
            <th>Төлбөр</th>
            <th>Шийдвэрлэх огноо</th>
            <th className="rounded-r-lg">Үйлдэл</th>
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
                <tr className={`table-row  cursor-pointer ${typeBg(e.type)}`} key={i} onClick={() => setSelectedCall(e)}>
                  <td className="rounded-l-full">{e.callId.toString().padStart(5, "0")}</td>
                  <td className="">{DeviceIcon(e.device)}</td>
                  <td>{e.category}</td>
                  <td>{e.address}</td>
                  <td>{e.operator}</td>
                  <td className="truncate">{e.name}</td>
                  <td className="truncate max-w-[200px]">{e.detail}</td>
                  <td>{e.branch}</td>
                  <td>{e.status}</td>
                  <td>{e.price}</td>
                  <td>{getTime(e._id)}</td>
                  <td className="rounded-r-full">
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

const typeBg = (type) => {
  switch (type) {
    case "casual":
      return "bg-yellow-100 hover:bg-yellow-50";
    case "emergency":
      return "bg-red-100 hover:bg-red-50";
    case "special":
      return "bg-blue-100 hover:bg-blue-50";
    case "replied":
      return "bg-green-100 hover:bg-green-50";
    default:
      return "bg-yellow-100 hover:bg-ywllow-50";
  }
};
function DeviceIcon(device) {
  switch (device) {
    case "web":
      return <WebIcon className="mx-auto w-6" />;
    case "app":
      return <MobileIcon className="mx-auto w-6" />;
    case "mobile":
      return <PhoneIcon className="mx-auto w-6" />;
    case "operator":
      return <UserIcon className="mx-auto w-6" />;
    case "callCenter":
      return <OfficeIcon className="mx-auto w-6" />;
    default:
      return "error";
  }
}
