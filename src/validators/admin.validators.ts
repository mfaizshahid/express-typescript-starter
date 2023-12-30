import type { IApp } from '@src/interfaces';
import { IAdmin } from '@src/interfaces';
import Joi from 'joi';

const actionUser: IApp.JoiSchema<IAdmin.ActionUserRequestPayload> = {
  body: Joi.object<IAdmin.ActionUserRequestPayload, true>({
    userId: Joi.number().required(),
    action: Joi.string()
      .valid(...Object.values(IAdmin.UserActions))
      .required(),
  }),
};

export default {
  actionUser,
};
