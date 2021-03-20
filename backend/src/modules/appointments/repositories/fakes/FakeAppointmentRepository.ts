import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'; 
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthDTO from '@modules/appointments/dtos/IFindAllInMonthDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';


class FakeAppointmentRepository implements IAppointmentRepository {
   private appointments: Appointment[] = [];

   async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {
      const appointment = new Appointment();

      Object.assign(appointment, {
         id: uuid(),
         date,
         provider_id,
         user_id
      });

      this.appointments.push(appointment);
      return appointment;
   }

   async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> 
   {
      return this.appointments.find(appointment => 
         isEqual(appointment.date, date) && 
         appointment.provider_id === provider_id
      );
   }

   async findAllInMonth({ provider_id, month, year }: IFindAllInMonthDTO): Promise<Appointment[]> 
   {
      const appointments = this.appointments.filter(appointment => 
         appointment.provider_id === provider_id &&
         getMonth(appointment.date) + 1 === month &&
         getYear(appointment.date) === year
      );

      return appointments;
   }

   async findAllInDay({ provider_id, day, month, year }: IFindAllInDayDTO): Promise<Appointment[]> {
      const appointments = this.appointments.filter(appointment => 
         appointment.provider_id === provider_id &&
         getDate(appointment.date) === day &&
         getMonth(appointment.date) + 1 === month &&
         getYear(appointment.date) === year
      );

      return appointments;
   }
}


export default FakeAppointmentRepository;
