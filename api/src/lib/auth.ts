interface SignRequest {
  address: string;
  nonce: string;
  message: string;
}

export const generateSignRequest = (address: string, nonce: string): SignRequest => {
  const message = `Welcome to dMedia Manager!

This request will not trigger a blockchain transaction or cost any gas fees.

Your authentication status will reset after 24 hours.

Wallet address:
${address.toUpperCase()}

Nonce:
${nonce}`;
  return {
    address,
    nonce,
    message,
  }
};

