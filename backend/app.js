/* eslint-disable brace-style */
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const ErrorHand = require('./middlewares/ErrorHand');

const app = express();

const { PORT = 3000 } = process.env;
app.use(cors());

// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());
app.use(ErrorHand);

app.listen(PORT, () => {
  // eslint-disable-next-line block-spacing
  console.log(`App listening on port ${PORT}`);});
