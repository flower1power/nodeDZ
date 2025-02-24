import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

export enum TOKEN_DICTIONARY {
  token = 'token',
  city = 'city',
}

export const saveKeyValue = async (
  key: TOKEN_DICTIONARY,
  value: string[] | string,
) => {
  let data: Record<string, string> = {};

  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath, 'utf-8');
    data = JSON.parse(file);
  }

  data[key] = value as string;

  await promises.writeFile(filePath, JSON.stringify(data));
};

export const getKeyValue = async (
  key: TOKEN_DICTIONARY,
): Promise<string | undefined> => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath, 'utf-8');
    const data = JSON.parse(file);
    return data[key];
  }

  return undefined;
};

const isExist = async (path: string): Promise<boolean> => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};
