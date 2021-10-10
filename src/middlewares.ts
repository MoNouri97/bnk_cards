import { ErrorRequestHandler, RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err.code ?? res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    error: true,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
export default {
  notFound,
  errorHandler,
};
