import express from 'express';
import dotenv from 'dotenv';
import getWeather from './services/api.service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/weather', async (req, res) => {
  try {
    const city = req.query.name;

    if (!city) {
      console.error('❌ Ошибка: не передан параметр "name"');

      return res.status(400).json({
        error: 'Укажите параметр "name", например: /weather?name=moscow',
      });
    }

    const weather = await getWeather(city);

    res.json({
      city,
      weather: {
        description: weather.description,
        temperature: weather.temperature,
        humidity: weather.humidity,
        wind_speed: weather.wind_speed,
      },
    });
  } catch (error) {
    if (error) {
      res.status(500).json({ error: error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`🌍 Сервер запущен на http://localhost:${PORT}`);
});
