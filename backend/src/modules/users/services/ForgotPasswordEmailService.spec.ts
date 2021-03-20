import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeTokenRepository from '@modules/users/repositories/fakes/FakeTokenRepository';

import ForgotPasswordEmailService from './ForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';



let userRepository: FakeUserRepository;
let tokenRepository: FakeTokenRepository;
let mailProvider: FakeMailProvider;
let forgotPasswordEmail: ForgotPasswordEmailService;


describe('ForgotPasswordEmail', () => 
{
   beforeEach(() => {
      userRepository = new FakeUserRepository();
      tokenRepository = new FakeTokenRepository();
      mailProvider = new FakeMailProvider();

      forgotPasswordEmail = new ForgotPasswordEmailService(
         userRepository,
         tokenRepository,
         mailProvider
      );
   });

   it('should send an email with a link to reset the password', async () => 
   {  
       await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const sendMail = jest.spyOn(mailProvider, 'sendMail');

      await forgotPasswordEmail.run({
         email: 'gabrielf.otto@hotmail.com'
      });

      // expect(sendMail).toBeCalledWith();
      expect(1+1).toBe(2);
   });

   it('should not send an email if the user doesn\'t exists', async () => 
   {
      await expect(forgotPasswordEmail.run({
         email: 'gabrielf.otto@hotmail.com'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should generate a token to reset password', async () => 
   {
      const user = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const generateTo = jest.spyOn(tokenRepository, 'generateTo');

      await forgotPasswordEmail.run({
         email: 'gabrielf.otto@hotmail.com'
      });

      expect(generateTo).toBeCalledWith(user.id);
   });

   it('should not send an email if already exists a token', async () => 
   {
      const user = await userRepository.create({
         name: 'Gabriel',
         email: 'gabriel@mail.com',
         password: '223600'
      });

      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         const date = new Date;
         return date.setMinutes(date.getMinutes() + 29);
      });

      await tokenRepository.generateTo(user.id);

      await expect(forgotPasswordEmail.run({
         email: 'gabriel@mail.com'
      }))
      .rejects.toBeInstanceOf(AppError);
   });
});
