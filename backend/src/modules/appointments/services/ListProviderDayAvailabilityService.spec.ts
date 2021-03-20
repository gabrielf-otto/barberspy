import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';



let appointmentRepository: IAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviders', () => 
{
   beforeEach(() => 
   {
      appointmentRepository = new FakeAppointmentRepository();
      listProviderDayAvailability = new ListProviderDayAvailabilityService(
         appointmentRepository
      );
   });


   it('should list all provider day availability', async () => 
   {
      await appointmentRepository.create({
         date: new Date(2021, 4, 10, 14),
         provider_id: '#',
         user_id: '#'
      });

      await appointmentRepository.create({
         date: new Date(2021, 4, 10, 15),
         provider_id: '#',
         user_id: '#'
      });


      jest.spyOn(Date, 'now').mockImplementation(() => {
         return new Date(2021, 4, 10, 11).getTime();
      });


      const availability = await listProviderDayAvailability.run({
         provider_id: '#',
         day: 10,
         month: 5,
         year: 2021
      });

      expect(availability).toEqual(
         expect.arrayContaining([
            { hour: 9, available: false },
            { hour: 10, available: false },
            { hour: 13, available: true },
            { hour: 14, available: false },
            { hour: 15, available: false },
            { hour: 16, available: true }
         ])
      );
   });
});
