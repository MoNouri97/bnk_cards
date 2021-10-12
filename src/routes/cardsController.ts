import createCardSchema from 'dto/createCard.schema';
import deleteCardsSchema from 'dto/deleteCards.schema';
import User from 'entity/User';
import express from 'express';
import { validate } from 'middlewares';
import { createCard, deleteCards, getAllByUserId } from 'services/cardsService';

const cardsController = express.Router();

cardsController.get('/', async (req, res, next) => {
  try {
    res.json(await getAllByUserId((req.user as User).id));
  } catch (error) {
    next(error);
  }
});

cardsController.post('/', validate(createCardSchema), async (req, res, next) => {
  const {
    user,
    body: { pan },
  } = req;
  try {
    const card = await createCard(user.id, pan);
    res.status(201).json(card);
  } catch (error) {
    next(error);
  }
});

cardsController.delete('/', validate(deleteCardsSchema), async (req, res, next) => {
  const {
    user,
    body: { cards },
  } = req;
  try {
    const deleted = await deleteCards(user.id, cards);
    res.status(200).json({
      message: 'deleted',
      deleted,
    });
  } catch (error) {
    next(error);
  }
});

export default cardsController;
