import express from 'express';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes.js';

dotenv.config();

if (!process.env.BASE_URL || !process.env.API_KEY || !process.env.BASE_URL) {
  console.error(
    '❌ Ошибка: Не заданы BASE_URL или API_KEY или BASE_URL в .env',
  );
  process.exit(1);
}

const app = express();

app.use('/weather', weatherRoutes);

const errorHandler = (err, req, res, next) => {
  console.error(`❌ Ошибка: ${err.message}`);
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Внутренняя ошибка сервера' });
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`🌍 Сервер запущен на http://localhost:${process.env.PORT}`);
});
