import React, { useState } from "react";
import Modal from "../core/Modal";
import { CANCEL_CALL } from "../../apollo/gql/Call/callCancel";
import { useMutation } from "@apollo/client";
import { GET_CALL_LOGS } from "../../apollo/gql/Call/getCallLogs";

export default function CancellCall({ onClose, callId }) {
  return <Modal title="Дуудлага цуцлах" onClose={onClose} child={<Child onClose={onClose} callId={callId} />} />;
}

const Child = ({ onClose, callId }) => {
  const [cancelCall] = useMutation(CANCEL_CALL, {
    refetchQueries: () => [
      {
        query: GET_CALL_LOGS,
        variables: { callId: callId },
      },
    ],
    onCompleted() {
      onClose();
    },
  });
  const [desc, setDesc] = useState("");
  return (
    <div className="flex flex-col">
      <label className="font-semibold">Тайлбар</label>
      <textarea className="w-[800px] resize-none border" rows={5} value={desc} onChange={(e) => setDesc(e.target.value)} />
      <hr className="my-4" />
      <div className="flex justify-end gap-4">
        <button className="bg-red-400 py-2 px-4 rounded-md text-gray-100" onClick={() => cancelCall({ variables: { desc: desc, callId: callId } })}>
          Цуцлах
        </button>
        <button className="bg-primary py-2 px-4 rounded-md text-gray-100" onClick={onClose}>
          Буцах
        </button>
      </div>
    </div>
  );
};
