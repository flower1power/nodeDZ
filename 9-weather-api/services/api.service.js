import axios, { AxiosError } from 'axios';

const _getCoordinates = async (city) => {
  console.log(`🔍 Запрашиваем координаты для города: ${city}`);

  try {
    const url = `${process.env.BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.API_KEY}`;
    const { data } = await axios.get(url);

    if (data.length === 0) {
      throw new Error(`Город ${city} не найден`);
    }

    return { lat: data[0].lat, lon: data[0].lon };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(
        `❌ Ошибка при получении координат для города "${city}":`,
        err.message,
      );
    } else {
      console.error(
        `❌ Неизвестная ошибка при получении координат для города "${city}":`,
        err.message,
      );
    }
  }
};

const getWeather = async (city, lang = 'ru') => {
  const { lat, lon } = await _getCoordinates(city);

  console.log(`🌍 Запрашиваем погоду для координат: lat=${lat}, lon=${lon}`);

  try {
    const url = new URL(`${process.env.BASE_URL}/data/2.5/weather`);
    const { data } = await axios.get(`${url}`, {
      params: {
        lat,
        lon,
        appid: process.env.API_KEY,
        units: 'metric',
        lang,
      },
    });

    console.log(`✅ Получена погода для ${city}`);

    return {
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      console.error(
        `❌ Ошибка при получении погоды для города "${city}":`,
        err.message,
      );
    } else {
      console.error(
        `❌ Неизвестная ошибка при получении погоды для города "${city}":`,
        err,
      );
    }
  }
};

export default getWeather;
