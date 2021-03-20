import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';


class ProviderDayAvailabilityController {
   static async index(request: Request, response: Response): Promise<Response> 
   {
      const provider_id = request.params.id;
      const {  
         day,
         month, 
         year 
      } = request.params;

      const providerDayAvailability = container.resolve(ListProviderDayAvailabilityService);
      const availability = await providerDayAvailability.run(
      {
         provider_id,
         day: Number(day),
         month: Number(month),
         year: Number(year)
      });

      return response.json(availability);
   }
}


export default ProviderDayAvailabilityController;
