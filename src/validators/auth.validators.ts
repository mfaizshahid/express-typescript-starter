import { IAuth, IApp } from "@src/interfaces";
import Joi from "joi";

const register: IApp.JoiSchema<IAuth.RegisterRequestPayload> = {
  body: Joi.object<IAuth.RegisterRequestPayload, true>({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    rolename: Joi.string().required(),
  }),
};

export default {
  register,
};
