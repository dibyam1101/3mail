import React, { useEffect, useState } from "react";
import { upload } from "../utils/ipfs-utils";
import { encryptData, decryptData } from "../utils/crypto-utils";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import MailHandler from "../abis/MailHandler.json";

const marketplaceAddress = "0x666D09ce23e1c71767b507eEAa28aF9193Ce9b9b";

const Compose = () => {
  const [destination, setDestination] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const isPublicKeyRegistered = async (publicKey) => {
    return false;
  };

  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const getPublicKey = async () => {
    let encryptionPublicKey;
    await ethereum
      .request({
        method: "eth_getEncryptionPublicKey",
        params: [account],
      })
      .then((result) => {
        encryptionPublicKey = result;
      })
      .catch((error) => {
        if (error.code === 4001) {
          console.log("We can't encrypt anything without the key.");
        } else {
          console.error(error);
        }
      });

    console.log(encryptionPublicKey);
    return encryptionPublicKey;
  };

  const getDestinationPublicKey = async (destination) => {
    let provider = new ethers.providers.JsonRpcProvider(
      "https://rpc.ankr.com/eth_goerli"
    );
    const contract = new ethers.Contract(
      marketplaceAddress,
      MailHandler.abi,
      provider
    );

    const publicKey = await contract.getPublicKey(destination);

    return publicKey;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const encryptedData = encryptData(await getPublicKey(), content);
    const cid = await upload(account, JSON.stringify(encryptedData));
    console.log(cid);
    // setLoading(false);
    // setDestination("");
    // setContent("");

    // const publicKey = await getPublicKey();
    // const encryptedData = encryptData(publicKey, content);
    // const decrypted = await decryptData(account, encryptedData, ethereum);
    // console.log(await getPublicKey())
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(
    //   marketplaceAddress,
    //   MailHandler.abi,
    //   signer
    // );

    // const destinationPublicKey = await getDestinationPublicKey(destination);
    console.log(content)
    console.log("ENCRYPTEDDATA COMPOSE", encryptedData);
    console.log(account);
    // const decrypted = await decryptData(
    //   "0xaea9381CA33f7c3C7C42Db7C99ce805d3214F4E6",
    //   encryptedData,
    //   ethereum
    // );
    // console.log("Idhar", new TextDecoder().decode(decrypted));

    // const cid = await upload(account, encryptedData.toJSON().data);

    // const transaction = await contract.addMessageLog(destination, cid);
    // await transaction.wait();
    setLoading(false);
  };

  return (
    <div className="rounded-xl mt-32 mx-80 text-white font-poppins bg-white/40 h-[700px] p-16 flex flex-col gap-16">
      {loading ? <h1>Sending...</h1> : null}
      <div className="flex flex-row items-center justify-around gap-8">
        <label htmlFor="destination" className="text-2xl text-black font-bold">
          Destination
        </label>
        <input
          type="text"
          name="destination"
          id="destination"
          className="w-full h-12 rounded-xl bg-white/40 text-white font-poppins p-4 text-black"
          value={destination}
          onChange={handleDestinationChange}
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="content" className="text-2xl text-black font-bold">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          cols="30"
          rows="10"
          className="w-full h-64 rounded-xl bg-white/40 text-white font-poppins p-4 text-black"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>

      <div className="flex flex-row justify-center gap-8">
        <button
          className="text-black bg-secondary py-4 px-8 hover:scale-105 transition rounded-full font-poppins text-3xl font-bold cursor-pointer"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Compose;
