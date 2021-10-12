import express from 'express';
import passport from 'passport';
import authController from 'routes/authController';
import cardsController from 'routes/cardsController';

const api = express.Router();

api
  .use(authController)
  .use(passport.authenticate('jwt', { session: false }))
  .use('/cards', cardsController);

export default api;
