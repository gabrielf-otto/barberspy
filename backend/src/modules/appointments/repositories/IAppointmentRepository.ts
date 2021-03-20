import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';
import IFindAllInMonthDTO from '../dtos/IFindAllInMonthDTO';


export default interface IAppointmentRepository {
   create: (data: ICreateAppointmentDTO) => Promise<Appointment>;
   findByDate: (date: Date, provider_id: string) =>  Promise<Appointment | undefined>;
   findAllInMonth: (data: IFindAllInMonthDTO) =>  Promise<Appointment[]>;
   findAllInDay: (data: IFindAllInDayDTO) =>  Promise<Appointment[]>;
}
