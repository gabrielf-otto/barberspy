import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import SessionService from './SessionService';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


let userRepository: IUserRepository;
let hashProvider: IHashProvider;
let createUserService: CreateUserService;
let sessionService: SessionService;


describe('SessionsService', () => 
{
   beforeEach(() => 
   {
      userRepository = new FakeUserRepository();
      hashProvider = new FakeHashProvider();

      createUserService = new CreateUserService(
         userRepository,
         hashProvider
      );

      sessionService = new SessionService(
         userRepository, 
         hashProvider
      );
   });

   it('should validate user\'s data an generate a token', async () => 
   {
      const user = {
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      };

      await createUserService.run(user);

      const data = await sessionService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      expect(data).toHaveProperty('token');
   });

   it('should not pass in email/user validation', async () => 
   {
      await expect(sessionService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should not pass in password match validation', async () => 
   {
      await createUserService.run({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });


      await expect(sessionService.run({
         email: 'gabrielf.otto@hotmail.com',
         password: '22360'
      })
      ).rejects.toBeInstanceOf(AppError);
   });
});
