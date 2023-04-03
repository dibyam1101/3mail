import React, { useEffect } from "react";
import FoxComponent from "../components/Fox/Fox.component";
import styles from "../style";
import { useMetaMask } from "metamask-react";

const GetStarted = () => {
  console.log(styles)
  const { status, connect, account, chainId, ethereum } = useMetaMask();

  const connectToMetamask = async () => {
    await connect();
    console.log(account);
  };

  return (
    <div className="flex flex-col w-full justify-between items-center gap-8 overflow-auto p-8">
      {status === "connected" ? <h1>Connected</h1> : <h1>Not Connected</h1>}

      <h1 className="text-center font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
        Get Started
      </h1>
      <div>
        <FoxComponent />
      </div>
      <p className={`${styles.paragraph}`}>
        To get started, please connect your Metamask wallet. We do not own your
        private keys and cannot access your funds without your confirmation
      </p>

      <h3
        className={`bg-secondary py-4 px-8 hover:scale-105 transition rounded-full font-poppins text-3xl font-bold cursor-pointer`}
        onClick={connectToMetamask}
        disabled={status === "connected"}
      >
        {status !== "connected" ? "Connect" : "Connected"}
      </h3>
    </div>
  );
};

export default GetStarted;
