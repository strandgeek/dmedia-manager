import Web3 from "web3";

export const web3 = new Web3(process.env.WEB3_PROVIDER_URI || 'http://localhost:8545');
