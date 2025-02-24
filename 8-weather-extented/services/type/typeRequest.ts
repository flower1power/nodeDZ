export interface IGeoParams {
  q: string | string[];
  limit: number;
  appid: string;
}

export interface IWeatherParams {
  lat: number;
  lon: number;
  appid: string;
  units: 'metric' | 'standard';
  lang: 'ru' | 'en';
}
