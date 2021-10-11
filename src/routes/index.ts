import express from 'express';
import authController from 'routes/authController';

const api = express.Router();

api.use(authController);

export default api;
