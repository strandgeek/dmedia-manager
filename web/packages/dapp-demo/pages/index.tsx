import type { NextPage } from "next";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { MediaPicker, useMediaPicker } from "react-dmedia-manager";
import { useCallback, useState } from "react";
import { Media } from "react-dmedia-manager/lib/esm/types/media";
import { MediaPreview } from "./components/MediaPreview";

let web3Modal: Web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
  });
}

const Home: NextPage = () => {
  const [web3, setWeb3] = useState<Web3>();
  const connectWallet = useCallback(async function () {
    try {
      if (!web3Modal) {
        return;
      }
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);
      setWeb3(web3);
    } catch (error) {
      console.error("Could not connect to Web3 Provider");
    }
  }, []);
  const { mediaPicker } = useMediaPicker({
    web3,
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div>
        {mediaPicker.selectedMedia && (
          <div className="mb-4">
            <MediaPreview media={mediaPicker.selectedMedia} />
          </div>
        )}
        {web3 ? (
          <>
            <button
              type="button"
              onClick={() => mediaPicker.open()}
              className="items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Select Media...
            </button>
            <MediaPicker mediaPicker={mediaPicker} />
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => connectWallet()}
              className="items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
