import { RequestHandler } from 'express';
import { AnySchema, ValidationError } from 'yup';

const validate =
  (schema: AnySchema): RequestHandler =>
  async (req, res, next) => {
    try {
      await schema.validate(
        {
          body: req.body,
          params: req.params,
          query: req.query,
        },
        { abortEarly: false },
      );
    } catch (e) {
      return res.status(400).json({
        error: true,
        message: (e as ValidationError).message,
        errors: (e as ValidationError).errors,
      });
    }

    return next();
  };
export default validate;
