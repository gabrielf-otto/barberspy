import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import FakeNotificationRepository from '@modules/notifications/repositories/fakes/FakeNotificationRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';


let appointmentRepository: FakeAppointmentRepository;
let notificationRepository: FakeNotificationRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
   beforeEach(() => 
   {
      appointmentRepository = new FakeAppointmentRepository();
      notificationRepository = new FakeNotificationRepository();

      createAppointment = new CreateAppointmentService(
         appointmentRepository,
         notificationRepository
      );
   });

   it('should be able to create an appointment', async () => 
   {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2021, 3, 10, 12).getTime();
      });

      const appointment = await createAppointment.run({
         date: new Date(2021, 3, 10, 13),
         provider_id: '19282919',
         user_id: '#'
      });

      expect(appointment).toHaveProperty('id');
      expect(appointment.provider_id).toBe('19282919');
   });

   it('should not allow create two appointments on the same time', async () => 
   {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2021, 3, 8, 12).getTime();
      });

      const date = new Date(2021, 3, 8, 13);

      await createAppointment.run({
         date,
         provider_id: '1010101',
         user_id: '#'
      });

      await expect(createAppointment.run({
         date,
         provider_id: '1010101',
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });
   
   it('should not allow to create an apointment on a past date', async () => 
   {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2021, 3, 10, 12).getTime();
      });

      await expect(createAppointment.run({
         date: new Date(2021, 3, 10, 11),
         provider_id: '1010101',
         user_id: '#'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not allow to create an apointment with yourself', async () => 
   {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2021, 3, 10, 12).getTime();
      });

      await expect(createAppointment.run({
         date: new Date(2021, 3, 10, 13),
         provider_id: '#1',
         user_id: '#1'
      }))
      .rejects.toBeInstanceOf(AppError);
   });

   it('should not allow to create an apointment before 8am and after 17pm', async () => 
   {
      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         return new Date(2021, 3, 9, 12).getTime();
      });

      await expect(createAppointment.run({
         date: new Date(2021, 3, 10, 7),
         provider_id: '#1',
         user_id: '#2'
      }))
      .rejects.toBeInstanceOf(AppError);

      await expect(createAppointment.run({
         date: new Date(2021, 3, 10, 18),
         provider_id: '#1',
         user_id: '#2'
      }))
      .rejects.toBeInstanceOf(AppError);
   });
});
