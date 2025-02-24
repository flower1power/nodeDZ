import { Router } from 'express';
import getWeather from '../services/api.service.js';

const weatherRoutes = Router();

weatherRoutes.get('/', async (req, res) => {
  try {
    const city = req.query.name;

    if (!city) {
      const error = new Error(
        'Укажите параметр "name", например: /weather?name=moscow',
      );
      error.status = 400;
      throw error;
    }

    const weather = await getWeather(city);

    if (!weather) {
      const error = new Error(`Погода для города "${city}" не найдена`);
      error.status = 404;
      throw error;
    }

    res.json({
      city,
      weather: {
        description: weather.description,
        temperature: weather.temperature,
        humidity: weather.humidity,
        wind_speed: weather.wind_speed,
      },
    });
  } catch (err) {
    next(err);
  }
});

export default weatherRoutes;
