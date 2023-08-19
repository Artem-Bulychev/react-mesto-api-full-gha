const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { urlRegex } = require('../utils/constants');
const {
  getCards,
  createCard,
  putCardLike,
  deleteCardLike,
  deleteCardById,
} = require('../controllers/cards');

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegex),
    }),
  }),
  createCard,
);

router.get('/', getCards);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  putCardLike,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCardLike,
);

router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCardById,
);

module.exports = router;
