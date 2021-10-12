import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
};

export default notFound;
