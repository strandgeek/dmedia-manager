const GATEWAY_BASE_URL = process.env.GATEWAY_BASE_URL || 'https://ipfs.infura.io'

export const cidToGatewayUrl = (cid: string) => `${GATEWAY_BASE_URL}/ipfs/${cid}`;
