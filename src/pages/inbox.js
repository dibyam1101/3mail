import React, { useEffect, useState } from "react";
import InboxMessage from "../components/InboxMessage";
import { useMetaMask } from "metamask-react";
import { fetchMessage } from "../utils/ipfs-utils";
import { decryptData, encryptData } from "../utils/crypto-utils";
import { ethers } from "ethers";
import { parse } from "postcss";
import Popup from "reactjs-popup";
import { useAlert } from "react-alert";

const Inbox = () => {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const alert = useAlert();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(ethereum);
  const cids = [
    "bafybeibdvumae7kfxabtf2zfthgee3gligbj5ylgusukkckxyx4krvrove",
    "bafybeifxt77ydb54al2vaeipmtaunudao5nmxpwklyxf4fanvqpcoesqze",
    "bafybeibhth7wcdy4cbtvosvx56b7dtsjifvocjczmbpnkcaraafzgwgqp4",
  ];

  async function fetchMessageLocal() {
    setLoading(true);
    let localMessages = [];
    for (let cid of cids) {
      console.log("CID", cid);
      const message = await fetchMessage(cid);
      const parsedMessage = await JSON.parse(message);
      const encryptedMessage = await JSON.parse(parsedMessage.content).data;

      // const decryptedMessage = await decryptData(
      //   account,
      //   Buffer.from(encryptedMessage),
      //   ethereum
      // );

      console.log("Encrypted Message", encryptedMessage);
      // console.log(decryptedMessage.toString());

      localMessages = localMessages.concat({
        from: parsedMessage.from,
        date: parsedMessage.date.toLocaleString(),
        content: "Click to SEE" || new TextDecoder().decode(decryptedMessage),
        onClick: async () => {
          const decryptedMessage = await decryptData(
            account,
            Buffer.from(encryptedMessage),
            ethereum
          );

          alert.show(new TextDecoder().decode(decryptedMessage));
        },
      });
    }

    setMessages(localMessages);
    setLoading(false);
  }

  console.log(messages);
  return (
    //Show loading message if loading
    <>
      {loading ? <h1 className="text-xl text-white mx-80">Loading</h1> : null}
      <div className="text-white text-xl font-bold font-poppins mx-80 overflow-x-auto h-[800px] ">
        <p
          onClick={() => {
            fetchMessageLocal();
          }}
        >
          Fetch Messages
        </p>
        {messages.map((message, i) => (
          <InboxMessage
            key={i}
            from={message.from}
            timeInEpochs={message.date}
            hash={message.content}
            onClick={message.onClick}
          />
        ))}
      </div>
    </>
  );
};

export default Inbox;
