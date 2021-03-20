import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProviderApointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';


class ProviderController {
   static async index(request: Request, response: Response): Promise<Response> 
   {
      const provider_id = request.user.id;
      const { 
         day, 
         month, 
         year 
      } = request.params;

      const providerAppointments = container.resolve(ListProviderApointmentsService);
      const appointments = await providerAppointments.run(
      {
         provider_id,
         day: Number(day),
         month: Number(month),
         year: Number(year)
      });

      return response.json(classToClass(appointments));
   }
}


export default ProviderController;
