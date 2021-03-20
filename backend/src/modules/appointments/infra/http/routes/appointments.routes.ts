import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import auth from '@modules/users/infra/middlewares/auth';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';


const appointmentsRouter = Router();
appointmentsRouter.use(auth);


appointmentsRouter.post('/appointments', 
   celebrate({
      [Segments.BODY]: {
         provider_id: Joi.string().uuid().required(),
         date: Joi.date()
      }
   }), 
AppointmentController.store);

appointmentsRouter.get('/appointments/me/:day/:month/:year', ProviderAppointmentsController.index);


export default appointmentsRouter;
