import passportConfig from 'config/passport';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { errorHandler, notFound } from 'middlewares';
import morgan from 'morgan';
import passport from 'passport';
import api from 'routes';

dotenv.config();
passportConfig(passport);

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    message: '👋🌎🌍🌏✨',
  });
});
// testing jwt protection
app.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    message: '🔓🔓🔓✨',
    user: req.user,
  });
});

app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
