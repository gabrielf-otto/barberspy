import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';


interface IRequest {
   provider_id: string;
   day: number;
   month: number;
   year: number;
}

@injectable()
class ListProviderAppointmentsService
{
   constructor(
      @inject('AppointmentRepository')
      private appointmentRepository: IAppointmentRepository,

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider
   ) 
   {}

   async run({ provider_id, day, month, year }: IRequest): Promise<Appointment[] | null> 
   {  
      const key = `provider-appointments:${provider_id}-${year}-${month}-${day}`;
      let appointments = await this.cacheProvider.get<Appointment[]>(key);

      if (!appointments) {
         appointments = await this.appointmentRepository.findAllInDay({
            provider_id,
            day,
            month,
            year
         });

         await this.cacheProvider.set(key, classToClass(appointments));
      }

      return appointments;
   }
}


export default ListProviderAppointmentsService;
