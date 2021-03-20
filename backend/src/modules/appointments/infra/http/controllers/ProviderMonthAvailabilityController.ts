import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';


class ProviderMonthAvailabilityController {
   static async index(request: Request, response: Response): Promise<Response> 
   {
      const provider_id = request.params.id;
      const {  
         month, 
         year 
      } = request.params;

      const providerMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
      const availability = await providerMonthAvailability.run(
      {
         provider_id,
         month: Number(month),
         year: Number(year)
      });

      return response.json(availability);
   }
}


export default ProviderMonthAvailabilityController;
