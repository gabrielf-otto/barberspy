import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import auth from '@modules/users/infra/middlewares/auth';
import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';


const providersRouter = Router();
providersRouter.use(auth);


providersRouter.get('/providers', ProviderController.index);

providersRouter.get('/providers/:id/month/availability/:month/:year', 
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
         month: Joi.string().required(),
         year: Joi.string().required()
      }
   }),

ProviderMonthAvailabilityController.index);


providersRouter.get('/providers/:id/day/availability/:day/:month/:year', 
   celebrate({
      [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
         day: Joi.string().required(),
         month: Joi.string().required(),
         year: Joi.string().required()
      }
   }),

ProviderDayAvailabilityController.index);



export default providersRouter;
