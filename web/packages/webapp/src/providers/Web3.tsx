import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { auth, generateSignRequest } from "../api/mutations/auth";
import { Account, Web3Context, Web3ContextValue } from "../hooks/useWeb3";
import Identicon from 'identicon.js'


export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [web3Modal, setWeb3Modal] = useState<Web3Modal | undefined>();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<Account | undefined>(undefined);

  const setConnectedAccountFromAddress = useCallback((address: string) => {
    const avatarData = connectedAccount ? new Identicon(address || '', 420).toString() : '';
    const avatar = `data:image/png;base64,${avatarData}`;
    setConnectedAccount({
      avatar,
      address,
    })
  }, [connectedAccount]);

  useEffect(() => {
    setWeb3Modal(
      new Web3Modal({
        network: 'mainnet',
        cacheProvider: true,
        providerOptions: {},
      })
    );
  }, []);

  const connect = useCallback(async function () {
    if (!web3Modal) {
      return;
    }
    const provider = await web3Modal.connect();
    setWeb3(new Web3(provider));
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setConnectedAccountFromAddress(accounts[0]);
    return accounts[0];
  }, [setConnectedAccountFromAddress, web3Modal]);

  const signAuth = async () => {
    const account = await connect();
    try {
      const signRequest = await generateSignRequest({
        address: account,
      });
      try {
        // @ts-ignore
        const signature = await web3?.eth.personal.sign(
          signRequest.message,
          account
        );
        const { accessToken } = await auth({
          address: account,
          signature: signature!,
        });
        localStorage.setItem("accessToken", accessToken);
        window.location.reload();
      } catch (error) {
        console.log({ error });
      }
    } catch (error) {
      console.log("Could not catch error");
    }
  };

  const web3Ctx: Web3ContextValue = {
    connect,
    signAuth,
    web3,
    connectedAccount,
  }

  return (
    <Web3Context.Provider value={web3Ctx}>
      {children}
    </Web3Context.Provider>
  );
}
