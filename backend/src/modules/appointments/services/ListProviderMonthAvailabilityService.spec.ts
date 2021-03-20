import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';



let appointmentRepository: IAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviders', () => 
{
   beforeEach(() => 
   {
      appointmentRepository = new FakeAppointmentRepository();
      listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
         appointmentRepository
      );
   });


   it('should list all provider day availability', async () => 
   {
      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 8, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 9, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 10, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 11, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 12, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 13, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 14, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 15, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 16, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 9, 17, 0, 0),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 2, 10, 8, 0, 0),
         provider_id: '#',
         user_id: '#'
      });


      const availability = await listProviderMonthAvailability.run({
         provider_id: '#',
         month: 3,
         year: 2021
      });

      expect(availability).toEqual(
         expect.arrayContaining([
            { day: 9, available: false },
            { day: 10, available: true }
         ])
      );
   });
});
