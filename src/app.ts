import passportConfig from 'config/passport';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import api from 'routes';
import middlewares from './middlewares';

dotenv.config();
passportConfig(passport);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: '👋🌎🌍🌏✨',
  });
});
// testing jwt protection
app.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (_req, res) => {
    res.json({
      message: '🔓🔓🔓✨',
    });
  },
);

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
