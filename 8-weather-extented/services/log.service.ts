import chalk from 'chalk';
import dedent from 'dedent';
import { WeatherIcon } from './api.v2.service.js';
import { IResponseWeather } from './type/typeResponse.js';

export const printError = (err: string) => {
  console.log(chalk.bgRed('ERROR:') + ' ' + `${err}`);
};

export const printSuccess = (msg: string) => {
  console.log(chalk.bgGreen('SUCCESS:') + ' ' + `${msg}`);
};

export const printHelp = (): void => {
  console.log(
    dedent`${chalk.bgYellow('HELP:')}
    Без параметров - вывод погоды
    -s [CITY,CITY,CITY,...] для установки города/ов
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `,
  );
};

export const printWeather = (
  res: IResponseWeather,
  icon: WeatherIcon,
  lang: 'ru' | 'en' = 'ru',
): void => {
  const isEnglish = lang === 'en';

  console.log(
    dedent`${chalk.bgCyan(' WEATHER: ')} ${
      isEnglish ? 'Weather in city' : 'Погода в городе'
    } ${res.name}
    ${icon} ${res.weather[0].description}
    ${isEnglish ? 'Temperature' : 'Температура'}: ${res.main.temp} (${
      isEnglish ? 'feels like' : 'ощущается как'
    } ${res.main.feels_like})
    ${isEnglish ? 'Humidity' : 'Влажность'}: ${res.main.humidity} %
    ${isEnglish ? 'Wind speed' : 'Скорость ветра'}: ${res.wind.speed}
    `,
  );
};
