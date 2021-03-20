import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionController from '@modules/users/infra/http/controllers/SessionController';


const sessionRouter = Router();


sessionRouter.post('/session', 
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required(),
         password: Joi.string().required()
      }
   }),

SessionController.store);


export default sessionRouter;
