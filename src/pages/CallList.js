import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_CALLS } from "../apollo/gql/Call/call";
import AddCall from "../components/modal/AddCall";
import CallTable from "../components/CallTable";
import Header from "../components/Header";

export default function CallList() {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [addCall, setAddCall] = useState(null);
  const [fetchCalls, { loading, error, data: getCalls }] = useLazyQuery(GET_CALLS, { variables: { status: selectedStatus } });
  useEffect(() => {
    fetchCalls();
  }, [selectedStatus, fetchCalls]);
  return (
    <>
      <Header />
      <button className="btn w-40">TesT button</button>
      <div className="grow flex flex-col">
        <div className="flex justify-between px-4 py-2">
          <div className="flex gap-2">
            {tabs.map((e) => (
              <Tab key={e.title} title={e.title} status={e.status} handleClick={() => setSelectedStatus(e.status)} />
            ))}
          </div>
          <button className="bg-blue-500 rounded-lg px-4 text-white" onClick={() => setAddCall(true)}>
            Бүртгэх
          </button>
        </div>
        <CallTable calls={getCalls?.getCalls} />
        {addCall && <AddCall onClose={() => setAddCall(null)} loading={loading} error={error} />}
      </div>
    </>
  );
}

function Tab({ title = "", handleClick = () => {} }) {
  return (
    <div className="border-2 rounded-lg shadow-sm p-4 cursor-pointer hover:bg-blue-300 hover:text-white" onClick={handleClick}>
      {title}
    </div>
  );
}

const tabs = [
  { title: "Бүгд", status: "" },
  { title: "Шинэ", status: "new" },
  { title: "Шалгаж байгаа", status: "pending" },
  { title: "Ажил хувиаралсан", status: "working" },
  { title: "Гүйцэтгэсэн", status: "done" },
  { title: "Цуцлагадсан", status: "canceled" },
];
