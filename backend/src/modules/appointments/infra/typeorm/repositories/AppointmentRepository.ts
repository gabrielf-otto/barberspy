import { getRepository, Raw, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; 
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';


class AppointmentRepository implements IAppointmentsRepository {
   private repository: Repository<Appointment>

   constructor() {
      this.repository = getRepository(Appointment);
   }

   async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = await this.repository.create({
         date,
         provider_id,
         user_id
      });

      await this.repository.save(appointment);
      return appointment;
   }

   async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
      return await this.repository.findOne({ where: { date, provider_id }});  
   }

   async findAllInMonth({ 
      provider_id, 
      month, 
      year 
   }: IFindAllInMonthDTO): Promise<Appointment[]> 
   {
      const parsedMonth = month.toString().padStart(2, '0');
      const appointments = await this.repository.find({
         where: { 
            provider_id,
            date: Raw(fieldName =>
               `to_char(${fieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
            )
         }
      });

      return appointments;
   }

   async findAllInDay({ 
      provider_id, 
      day, 
      month, 
      year 
   }: IFindAllInDayDTO): Promise<Appointment[]> 
   {
      const parsedDay = day.toString().padStart(2, '0');
      const parsedMonth = month.toString().padStart(2, '0');

      const appointments = await this.repository.find({
         where: {
            provider_id,
            date: Raw(fieldName =>
               `to_char(${fieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
            )
         },
         relations: ['user']
      });

      return appointments;
   }
}


export default AppointmentRepository;
