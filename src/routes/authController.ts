import express from 'express';
import { login, register } from 'services/auth';

const authController = express.Router();

authController.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await login(email, password));
  } catch (error) {
    next(error);
  }
});
authController.post('/register', async (req, res, next) => {
  const { email, password, fullName } = req.body;
  try {
    res.status(201).json(await register({ email, password, fullName }));
  } catch (error) {
    next(error);
  }
});

export default authController;
