import type { IApp, IAuth } from '@src/interfaces';
import Joi from 'joi';

const register: IApp.JoiSchema<IAuth.RegisterRequestPayload> = {
  body: Joi.object<IAuth.RegisterRequestPayload, true>({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
};

const login: IApp.JoiSchema<IAuth.LoginRequestPayload> = {
  body: Joi.object<IAuth.LoginRequestPayload, true>({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

const generateToken: IApp.JoiSchema<IAuth.GenerateTokenRequestPayload> = {
  params: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

export default {
  register,
  login,
  generateToken,
};
