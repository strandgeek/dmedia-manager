import { sizeFormatter } from "human-readable";

export const formatSize = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal: any, symbol: any) => `${literal} ${symbol}B`,
})
