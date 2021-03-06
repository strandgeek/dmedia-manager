import { createContext, useContext } from "react";
import Web3 from "web3";

export interface Account {
  address: string;
  avatar: string;
}

export interface Web3ContextValue {
  web3: Web3 | null
  connectedAccount?: Account | null
  connect: () => Promise<{ web3: Web3 | null, account: string }>
  signAuth: () => void
  loaded?: boolean
}


export const Web3Context = createContext<Web3ContextValue>({
  web3: null,
  connect: () => Promise.resolve({ web3: null, account: '' }),
  signAuth: () => null,
  loaded: false,
})


export const useWeb3 = () => useContext(Web3Context);
