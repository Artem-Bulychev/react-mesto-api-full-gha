// Подключаем dotenv
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const routeSignup = require('./routes/signup');
const routeSignin = require('./routes/signin');

const auth = require('./middlewares/auth');

const routeUsers = require('./routes/users');
const routeCards = require('./routes/cards');

const ErrorNotFound = require('./errors/ErrorNotFound');
const errorHandler = require('./middlewares/errorHandler');

const { URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

mongoose.set('strictQuery', true);

mongoose.connect(URL)
  .then(() => {
    console.log('БД успешно подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(cors);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(limiter);

app.use('/', routeSignup);
app.use('/', routeSignin);

app.use(auth);

app.use('/users', routeUsers);
app.use('/cards', routeCards);

app.use((req, res, next) => next(new ErrorNotFound('Страницы по запрошенному URL не существует')));
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT);
