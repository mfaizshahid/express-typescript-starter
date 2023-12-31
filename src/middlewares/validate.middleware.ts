import { ApiError, objPicker } from '@src/utils';
import { type NextFunction, type Request, type Response } from 'express';
import httpStatus from 'http-status';
import Joi from 'joi';

/**
 * Validates incoming requests using a Joi schema.
 * @param {object} schema The Joi schema to use for validation.
 * @returns Middleware function for Express to validate incoming requests.
 */
const validate =
  (schema: object) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = objPicker.single(schema, ['body', 'query', 'params']);
    const requiredSchema = objPicker.single(req, Object.keys(schema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(requiredSchema);
    if (error != null) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    next();
  };

export default validate;
