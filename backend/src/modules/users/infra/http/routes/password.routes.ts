import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ForgotPasswordController from '../controllers/ForgotPasswordContoller';
import ResetPasswordController from '../controllers/ResetPasswordController';


const passwordRouter = Router();



passwordRouter.post('/password/forgot', 
   celebrate({
      [Segments.BODY]: {
         email: Joi.string().email().required()
      }
   }),

ForgotPasswordController.store);

passwordRouter.post('/password/reset', 
   celebrate({
      [Segments.QUERY]: {
         token: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
         password: Joi.string().required(),
         confirm: Joi.string().required().valid(Joi.ref('password'))
      }
   }),

ResetPasswordController.store);


export default passwordRouter;
