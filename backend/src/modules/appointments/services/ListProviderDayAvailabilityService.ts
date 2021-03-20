import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   provider_id: string;
   day: number;
   month: number;
   year: number;
}

type IResponse = Array<{
   hour: number;
   available: boolean;
}>

@injectable()
class ListProviderDayAvailabilityService
{
   constructor(
      @inject('AppointmentRepository')
      private appointmentRepository: IAppointmentRepository
   ) 
   {}

   async run({ provider_id, day, month, year }: IRequest): Promise<IResponse> 
   {  
      const appointments = await this.appointmentRepository.findAllInDay({
         provider_id, 
         day, 
         month, 
         year
      });

      const hoursStart = 8;
      const hours = Array.from(
         { length: 10 },
         (_, index) => index + hoursStart
      );

      const availability = hours.map(hour => {
         let hourAppointment = appointments.find(appointment =>
            getHours(appointment.date) === hour
         );

         const currentDate = new Date(Date.now());
         const compareDate = new Date(year, month - 1, day, hour);

         return {
            hour,
            available: !hourAppointment && isAfter(compareDate, currentDate)
         }
      });

      return availability;
   }
}


export default ListProviderDayAvailabilityService;
