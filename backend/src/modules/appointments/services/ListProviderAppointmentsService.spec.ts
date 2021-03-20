import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';



let appointmentRepository: IAppointmentRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviders', () => 
{
   beforeEach(() => 
   {
      appointmentRepository = new FakeAppointmentRepository();
      listProviderAppointments = new ListProviderAppointmentsService(
         appointmentRepository
      );
   });


   it('', async () => 
   {
      const appointment1 = await appointmentRepository.create({
         date: new Date(2021, 3, 1, 10),
         provider_id: '#provider',
         user_id: '#user'
      });

      const appointment2 = await appointmentRepository.create({
         date: new Date(2021, 3, 1, 14),
         provider_id: '#provider',
         user_id: '#user'
      });

      const appointments = await listProviderAppointments.run({
         day: 1,
         month: 4,
         year: 2021,
         provider_id: '#provider'
      });

      expect(appointments).toEqual([
         appointment1,
         appointment2
      ]);
   });
});
