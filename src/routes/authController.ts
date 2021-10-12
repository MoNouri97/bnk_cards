import loginSchema from 'dto/login.schema';
import registerSchema from 'dto/register.schema';
import express from 'express';
import { validate } from 'middlewares';
import { login, register } from 'services/auth';

const authController = express.Router();

authController.post('/login', validate(loginSchema), async (req, res, next) => {
  const { email, password } = req.body;
  try {
    res.json(await login(email, password));
  } catch (error) {
    next(error);
  }
});
authController.post('/register', validate(registerSchema), async (req, res, next) => {
  const { email, password, fullName } = req.body;
  try {
    res.status(201).json(await register({ email, password, fullName }));
  } catch (error) {
    next(error);
  }
});

export default authController;
