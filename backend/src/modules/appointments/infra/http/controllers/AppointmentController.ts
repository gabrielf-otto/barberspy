import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


class AppointmentController {
   static async store(request: Request, response: Response) 
   {
      const { 
         date, 
         provider_id 
      } = request.body;
      
      // const parsedDate = parseISO(date);
      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.run({
         // date: parsedDate,
         date,
         provider_id,
         user_id: request.user.id
      });

      return response.json(appointment);
   }
}


export default AppointmentController;
