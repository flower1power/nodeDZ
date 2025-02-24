#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from './services/log.service.js';
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js';
import {
  getWeather,
  getGeoCoordinates,
  getIcon,
} from './services/api.v2.service.js';

const saveToken = async (token: string): Promise<void> => {
  if (!token.length) {
    printError('Не передан токен');
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess('Токен сохранен');
  } catch (e) {
    printError(`Ошибка: ${(e as Error).message}`);
  }
};

const saveCity = async (cities: string[]): Promise<void> => {
  if (!cities || cities.length === 0) {
    printError(`Не переданы города`);
    return;
  }
  const token = await getKeyValue(TOKEN_DICTIONARY.token);

  if (!token) {
    printError('Не указан токен, задайте его через команду -t [API_KEY]');
    return;
  }
  const validCities: string[] = [];

  for (const city of cities) {
    try {
      const geo = await getGeoCoordinates(city, token);

      if (geo.lat && geo.lon) {
        validCities.push(city);
      }
    } catch (e) {
      printError(`Город "${city}" не найден или указан некорректно`);
    }
  }

  if (validCities.length > 0) {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.city, validCities);
      printSuccess(`Города сохранены: ${validCities.join(', ')}`);
    } catch (e) {
      printError(`Ошибка сохранения городов: ${(e as Error).message}`);
    }
  } else {
    printError('Ни один из переданных городов не был найден');
  }
};

const getForecast = async (lang: 'ru' | 'en'): Promise<void> => {
  try {
    const weathers = await getWeather(lang);

    if (weathers.length === 0) {
      printError('Нет данных');
      return;
    }

    for (const el of weathers) {
      if (el.data) {
        printWeather(el.data, getIcon(el.data.weather[0].icon), lang);
      } else {
        printError(`Ошибка для города ${el.city}: ${el.error}`);
      }
    }
  } catch (e) {
    if ((e as any)?.response?.status === 401) {
      printError('Не верно указан токен');
    } else {
      printError((e as Error).message);
    }
  }
};

const initCLI = async (): Promise<void> => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    const cities = Array.isArray(args.s) ? args.s : [args.s];
    return saveCity(cities as string[]);
  }
  if (args.t) {
    return saveToken(args.t as string);
  }
  getForecast(args.l as 'ru' | 'en');
};

initCLI();
