import React, { useState } from "react";
import Modal from "../core/Modal";
import Button from "../core/Button";

import { useQuery } from "@apollo/client";
import { GET_CALL_LOGS } from "../../apollo/gql/Call/getCallLogs";
import { GET_CALL_BY_ID } from "../../apollo/gql/Call/getCallById";
import getTime from "../../helper/getTime";
import CancellCall from "./CancellCall";

export default function CallDetail({ callInfo, onClose }) {
  return <Modal onClose={onClose} title="Захиалгын дэлгэрэнгүй" child={<Child callInfo={callInfo} />} />;
}

function Child({ callInfo }) {
  const [cancel, setCancel] = useState(null);
  const arr = Object.entries(callInfo).map((e) => e);
  arr.shift();

  const { data: call } = useQuery(GET_CALL_BY_ID, {
    variables: { _id: callInfo._id },
  });

  const { data } = useQuery(GET_CALL_LOGS, {
    variables: { callId: callInfo._id },
  });
  return (
    <div className="">
      <div className="flex justify-end gap-2">
        <button
          disabled={call?.getCallById?.status === "canceled" ? true : false}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 disabled:bg-gray-300"
          onClick={() => setCancel(callInfo._id)}>
          Цуцлах
        </button>
        <Button title="Болсон" />
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-3 gap-5">
        {arr.map((info) => (
          <div key={info[0]} className="flex flex-col">
            <label>{info[0]}</label>
            <input className="border rounded-lg py-1 px-2" value={info[1] ? info[1] : ""} readOnly />
          </div>
        ))}
      </div>
      <hr className="my-4" />
      <div className="w-full">
        <h4 className="font-bold ml-4 mb-4">Logs</h4>
        <div className="flex bg-blue-300">
          <div className="w-1/4 text-center border border-black">Огноо</div>
          <div className="w-1/4 text-center border border-black">Тайлбар</div>
          <div className="w-1/4 text-center border border-black">Төлөв</div>
          <div className="w-1/4 text-center border border-black">Ажилтан</div>
        </div>
        {data?.getLogs.map((e) => (
          <div key={e._id} className="flex bg-blue-100 my-1">
            <div className="w-1/4 text-center">{getTime(e._id)}</div>
            <div className="w-1/4 text-center">{e.desc}</div>
            <div className="w-1/4 text-center">{e.type}</div>
            <div className="w-1/4 text-center">{e.adminId}</div>
          </div>
        ))}
      </div>
      {cancel && <CancellCall onClose={() => setCancel(null)} callId={cancel} />}
    </div>
  );
}
