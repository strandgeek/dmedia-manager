import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { auth, generateSignRequest } from "../api/mutations/auth";
import { Account, Web3Context, Web3ContextValue } from "../hooks/useWeb3";
import Identicon from 'identicon.js'
import { useNavigate } from "react-router-dom";


export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
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
      return {
        web3: null,
        account: '',
      };
    }
    const provider = await web3Modal.connect();
    const web3 = new Web3(provider);
    setWeb3(web3);
    const accounts = await web3.eth.requestAccounts();
    setConnectedAccountFromAddress(accounts[0]);
    return {
      web3,
      account: accounts[0],
    };
  }, [setConnectedAccountFromAddress, web3Modal]);

  const signAuth = useCallback(async () => {
    const { web3, account } = await connect();
    try {
      const signRequest = await generateSignRequest({
        address: account || '',
      });
      try {
        // @ts-ignore
        const signature = await web3?.eth.personal.sign(
          signRequest.message,
          account
        );
        const { accessToken } = await auth({
          address: account || '',
          signature: signature!,
        });
        localStorage.setItem("accessToken", accessToken);
      } catch (error) {
        console.log({ error });
      }
    } catch (error) {
      console.log("Could not handle error error", error);
    }
  }, [connect]);

  useEffect(() => {
    (async () => {
      window.ethereum.on("accountsChanged", async function (accounts: any) {
        if (accounts[0]) {
          setConnectedAccount(accounts[0]);
        } else {
          await web3Modal!.clearCachedProvider();
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('currentProject');
        navigate('/');
      });
    })();
  }, [navigate, web3Modal]);


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
