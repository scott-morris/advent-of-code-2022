// Public.

export interface LeftPadOptions {
  width?: number;
  padWith?: string;
}

export default function leftPad(str: string, { width = 2, padWith = '0' }: LeftPadOptions = {}) {
  const padded = `${padWith.repeat(width)}${str}`;
  return padded.slice(0 - width);
}
