import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   provider_id: string;
   month: number;
   year: number;
}

type IResponse = Array<{
   day: number;
   available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService
{
   constructor(
      @inject('AppointmentRepository')
      private appointmentRepository: IAppointmentRepository
   ) 
   {}

   async run({ provider_id, month, year }: IRequest): Promise<IResponse> 
   {
      const appointments = await this.appointmentRepository.findAllInMonth({ 
         provider_id,
         month,
         year 
      });

      const daysInMonth = getDaysInMonth(new Date(year, month - 1));
      const days = Array.from(
         { length: daysInMonth },
         (_, index) => index + 1
      );

      const availability = days.map(day => {
         let compareDate = new Date(year, month - 1, day, 23, 59, 59);

         let dayAppointments = appointments.filter(appointment => 
            getDate(appointment.date) === day
         );

         return {
            day,
            available: isAfter(compareDate, new Date) && dayAppointments.length < 10
         }
      });

      return availability;
   }
}


export default ListProviderMonthAvailabilityService;
