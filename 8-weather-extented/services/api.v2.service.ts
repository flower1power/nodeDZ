import axios from 'axios';
import { getKeyValue, TOKEN_DICTIONARY } from './storage.service.js';
import {
  IResponseCoord,
  IResponseWeather,
  IWeather,
} from './type/typeResponse.js';
import { IGeoParams, IWeatherParams } from './type/typeRequest.js';
import { urlPath } from '../helpers/url.js';

export enum WeatherIcon {
  Clear = '☀️',
  FewClouds = '🌤️',
  ScatteredClouds = '☁️',
  BrokenClouds = '☁️',
  ShowerRain = '🌧️',
  Rain = '🌦️',
  Thunderstorm = '🌩️',
  Snow = '❄️',
  Mist = '🌫️',
  Unknown = '❓',
}

interface IGetWeather {
  city: string;
  data?: IResponseWeather;
  error?: string;
}

export const getIcon = (icon: IWeather['icon']): WeatherIcon => {
  switch (icon.slice(0, -1)) {
    case '01':
      return WeatherIcon.Clear;
    case '02':
      return WeatherIcon.FewClouds;
    case '03':
      return WeatherIcon.ScatteredClouds;
    case '04':
      return WeatherIcon.BrokenClouds;
    case '09':
      return WeatherIcon.ShowerRain;
    case '10':
      return WeatherIcon.Rain;
    case '11':
      return WeatherIcon.Thunderstorm;
    case '13':
      return WeatherIcon.Snow;
    case '50':
      return WeatherIcon.Mist;
    default:
      return WeatherIcon.Unknown;
  }
};

export const getGeoCoordinates = async (
  city: string | string[],
  token: string,
): Promise<{ lat: number; lon: number }> => {
  const url = new URL(urlPath.getGeo);
  const params: IGeoParams = { q: city, limit: 1, appid: token };

  const { data } = await axios.get<IResponseCoord[]>(`${url}`, {
    params,
  });

  if (data.length === 0) {
    throw new Error('Не верно указан город');
  }
  return { lat: data[0].lat, lon: data[0].lon };
};

export const getWeather = async (
  lang: IWeatherParams['lang'] = 'ru',
): Promise<IGetWeather[]> => {
  const token =
    process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token));

  if (!token) {
    throw new Error('Не указан токен, задайте его через команду -t [API_KEY]');
  }

  const cities = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));

  if (!cities) {
    throw new Error('Не указан город ');
  }

  const results: IGetWeather[] = [];

  for (const city of cities) {
    try {
      const coordinates = await getGeoCoordinates(city, token);

      const url = new URL(urlPath.getWeather);
      const params: IWeatherParams = {
        lat: coordinates.lat,
        lon: coordinates.lon,
        appid: token,
        units: lang === 'ru' ? 'metric' : 'standard',
        lang,
      };

      const { data } = await axios.get<IResponseWeather>(`${url}`, {
        params,
      });

      results.push({ city, data });
    } catch (e) {
      results.push({ city, error: (e as Error).message });
    }
  }

  return results;
};
