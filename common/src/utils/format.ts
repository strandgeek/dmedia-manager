import { sizeFormatter } from "human-readable";
import formatDurationLib from 'format-duration';

export const formatSize = sizeFormatter({
  std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal: any, symbol: any) => `${literal} ${symbol}B`,
})

export const formatDuration = (durationSeconds: number): string => {
  return formatDurationLib(durationSeconds * 1000);
}
