const { config } = require('dotenv');

const URL = 'mongodb://127.0.0.1:27017/mestodb';
const { SICRET_KEY = 'dev-secret' } = process.env;
const { NODE_ENV } = process.env;
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
if (NODE_ENV === 'production') {
  config();
}

module.exports = {
  URL,
  SICRET_KEY,
  NODE_ENV,
  urlRegex,
};
