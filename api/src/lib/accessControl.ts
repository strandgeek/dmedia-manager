import Web3 from "web3"

const INTERFACE_ABI: any = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address"
      }
    ],
    name: "hasMediaManagerAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

export const NETWORKS_NAMES = [
  'mainnet',
  'ropsten',
  'kovan',
  'rinkeby',
  'matic_mainnet',
  'matic_mumbai',
];


const getNetworkWeb3Url = (networkName: string): string => {
  if (networkName === 'matic_mainnet') {
    return 'https://matic-mainnet.chainstacklabs.com'
  }
  if (networkName === 'matic_mumbai') {
    return 'https://matic-mumbai.chainstacklabs.com'
  }
  return `https://${networkName}.infura.io/v3/${process.env.INFURA_ETH_PROJECT_ID}`;
}

const createNetworkWeb3 = (networkName: string): Web3 => new Web3(
  new Web3.providers.HttpProvider(getNetworkWeb3Url(networkName))
)

const NETWORKS: {
  mainnet: Web3;
  ropsten: Web3;
  kovan: Web3;
  rinkeby: Web3;
  [key: string]: Web3 | undefined
} = Object.assign(
  {},
  ...NETWORKS_NAMES.map(
    networkName => ({
      [networkName]: createNetworkWeb3(networkName)
    })
  )
);

export const hasMediaAccess = async (
  networkName: string,
  contractAddress: string,
  address: string
): Promise<boolean> => {
  const web3 = NETWORKS[networkName];
  if (!web3) {
    throw new Error('UNKNOWN_NETWORK');
  }
  const contract = new web3.eth.Contract(INTERFACE_ABI, contractAddress.toLowerCase());
  return contract.methods.hasMediaManagerAccess(address.toLowerCase()).call()
}
