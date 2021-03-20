import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeTokenRepository from '../repositories/fakes/FakeTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';



let userRepository: FakeUserRepository;
let tokenRepository: FakeTokenRepository;
let hashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;


describe('ResetPassword', () => {
   beforeEach(() => {
      userRepository = new FakeUserRepository();
      tokenRepository = new FakeTokenRepository();
      hashProvider = new FakeHashProvider();

      resetPassword= new ResetPasswordService(
         userRepository,
         tokenRepository,
         hashProvider
      );
   });

   it('should reset the password', async () => 
   {  
      const user = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const { value } = await tokenRepository.generateTo(user.id);

      const generate = jest.spyOn(hashProvider, 'generate');

      await resetPassword.run({
         token: value,
         password: '123456',
         confirm: '123456'
      });

      const updatedUser = await userRepository.findById(user.id);

      expect(updatedUser?.password).toBe('123456');
      expect(generate).toHaveBeenCalled();
   });

   it('should not find a user token', async () => 
   {
      await expect(resetPassword.run({
         token: '',
         password: '123456',
         confirm: '123456'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not find a user by token', async () => 
   {
      const gabriel = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const token = await tokenRepository.generateTo(gabriel.id);
      token.user_id = '';

      await expect(resetPassword.run({
         token: token.value,
         password: '123456',
         confirm: '123456'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not be valid to reset the password 30 min later the token was generated', async () => 
   {  
      const gabriel = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });


      const { value } = await tokenRepository.generateTo(gabriel.id);


      jest.spyOn(Date, 'now').mockImplementationOnce(() => {
         const date = new Date;
         return date.setMinutes(date.getMinutes() + 40);
      });


      await expect(resetPassword.run({
         token: value,
         password: '123456',
         confirm: '123456'
      }) 
      ).rejects.toBeInstanceOf(AppError);
   });
});
