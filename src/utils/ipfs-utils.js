import { Web3Storage } from "web3.storage";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDIwYzhCZDk5YTMyZjRjRjc1Nzk3OWQ4MDcxMjYyNmU0ODk4QjQzZmMiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA0NDE2Mjc2MTAsIm5hbWUiOiIzbWFpbCJ9.T8s1KJ8O_CvEogd2PIXmeLH7X8hnlgJyZlgxh3scZIg";

export const upload = async (from, encryptedMessage) => {
  let client;
  try {
    client = new Web3Storage({ token });
  } catch (err) {
    console.log(err);
  }

  console.log("IPFS UTILS", encryptedMessage);
  const messageObject = {
    from,
    date: Date.now().toLocaleString(),
    content: encryptedMessage,
  };

  const jsonMessageObject = JSON.stringify(messageObject);

  const file = new File([jsonMessageObject], "encrypted-message", {
    type: "text/plain",
  });

  const cid = await client.put([file]);

  return cid;
};

export const fetchMessage = async (cid) => {
  let client;
  try {
    client = new Web3Storage({ token });
  } catch (err) {
    console.log(err);
  }

  const res = await client.get(cid);

  console.log(`Got a response! [${res.status}] ${res.statusText}`);
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  const files = await res.files();

  const reader = new FileReader();
  const file = files[0];

  console.log(await file.arrayBuffer());
  reader.readAsBinaryString(file);
  let result;
  reader.addEventListener("load", (e) => {
    const data = e.target.result;
    result = data;
  });
  await sleep(1000);
  console.log(result);
  return result;
};
