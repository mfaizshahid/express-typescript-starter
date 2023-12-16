import { IAuth, IApp } from "@src/interfaces";
import Joi from "joi";

const register: IApp.JoiSchema<IAuth.RegisterRequestPayload> = {
  body: Joi.object<IAuth.RegisterRequestPayload, true>({
    username: Joi.string()
      .min(2)
      .max(25)
      .regex(/^[a-zA-Z0-9_]*$/)
      .message("Username must be alphanumeric and underscore only")
      .required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
  }),
};

export default {
  register,
};
