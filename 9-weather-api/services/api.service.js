import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

if (!API_KEY) {
  throw new Error('❌ API_KEY не задан в .env!');
}

const _getCoordinates = async (city) => {
  console.log(`🔍 Запрашиваем координаты для города: ${city}`);

  const url = `${BASE_URL}/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
  const { data } = await axios.get(url);

  if (data.length === 0) {
    throw new Error(`Город ${city} не найден`);
  }

  return { lat: data[0].lat, lon: data[0].lon };
};

const getWeather = async (city, lang = 'ru') => {
  const { lat, lon } = await _getCoordinates(city);

  console.log(`🌍 Запрашиваем погоду для координат: lat=${lat}, lon=${lon}`);

  const url = new URL(`${BASE_URL}/data/2.5/weather`);
  const { data } = await axios.get(`${url}`, {
    params: {
      lat,
      lon,
      appid: API_KEY,
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
};

export default getWeather;
