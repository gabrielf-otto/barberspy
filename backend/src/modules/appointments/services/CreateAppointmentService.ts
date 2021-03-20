import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';


interface IRequest {
   date: Date;
   provider_id: string;
   user_id: string;
}

@injectable()
class CreateAppointmentService 
{
   constructor(
      @inject('AppointmentRepository')
      private appointmentRepository: IAppointmentRepository,

      @inject('NotificationRepository')
      private notificationRepository: INotificationRepository,

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider 
   ) 
   {}

   async run({ date, provider_id, user_id }: IRequest): Promise<Appointment> 
   {
      const appointmentDate = startOfHour(date);
      if (isBefore(appointmentDate, Date.now())) 
      {
         throw new AppError(
            'Invalid date'
         );
      }

      if (isWeekend(date)) 
      {
         throw new AppError(
            'Non-commercial date'
         );
      }

      const providerAppointment = await this.appointmentRepository.findByDate(appointmentDate, provider_id);
      if (providerAppointment) 
      {
         throw new AppError(
            'Already exists an appointments for this date'
         );
      }

      if (provider_id === user_id) 
      {
         throw new AppError(
            'Invalid provider'
         );
      }

      if (getHours(date) < 8 || getHours(date) > 17) 
      {
         throw new AppError(
            'Only 8am to 17pm'
         );
      }

      const appointment = await this.appointmentRepository.create({
         date: appointmentDate,
         provider_id,
         user_id
      });

      const formattedDate = format(
         appointmentDate, 'dd/MM/yyyy \'às\' HH:mm', 
         { locale: ptBR }
      );

      await this.notificationRepository.create({
         recipient_id: provider_id,
         content: `Novo agendamento para ${formattedDate}`
      });

      await this.cacheProvider.invalidate(
         `provider-appointment:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
      );

      return appointment;
   }
}


export default CreateAppointmentService;
