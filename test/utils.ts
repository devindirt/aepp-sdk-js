import { AensName } from '../src';

function randomString(len: number): string {
  const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  for (let i = 0; i < len; i += 1) {
    const randomPoz = Math.floor(Math.random() * charSet.length);
    string += charSet.charAt(randomPoz);
  }
  return string;
}

// eslint-disable-next-line import/prefer-default-export
export function randomName(length: number): AensName {
  return `${randomString(length)}.chain`;
}
