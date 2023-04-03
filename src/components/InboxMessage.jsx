import React from "react";

const InboxMessage = ({ from, timeInEpochs, hash, onClick }) => {
  return (
    <div className="rounded-xl flex flex-col justify-between bg-white/30 m-8 p-8 gap-3" onClick={onClick}>
      <p>From: {from}</p>
      <p>Date: {timeInEpochs}</p>
      <p>Content: {hash}</p>
    </div>
  );
};

export default InboxMessage;
