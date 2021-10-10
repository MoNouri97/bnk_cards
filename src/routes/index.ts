import express from 'express';
import authRouter from 'routes/authApi';

const api = express.Router();

api.use(authRouter);

export default api;
