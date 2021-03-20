import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import auth from '@modules/users/infra/middlewares/auth';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';


const profileRouter = Router();
profileRouter.use(auth);


profileRouter.put('/profile', 
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         old_password: Joi.string(),
         new_password: Joi.string(),
         confirm: Joi.string().valid(Joi.ref('new_password'))
      }
   }),

ProfileController.update);

profileRouter.get('/profile', ProfileController.show);


export default profileRouter;
