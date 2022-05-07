
const GATEWAY_BASE_URL = process.env.GATEWAY_BASE_URL || 'https://ipfs.io'

export const cidToGatewayUrl = (cid: string) => `${GATEWAY_BASE_URL}/ipfs/${cid}`;
