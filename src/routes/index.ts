import express from 'express';
import authRouter from 'routes/authRouter';

const api = express.Router();

api.use(authRouter);

export default api;
