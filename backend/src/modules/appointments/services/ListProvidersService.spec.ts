import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import ListProvidersService from './ListProvidersService';



let userRepository: IUserRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => 
{
   beforeEach(() => 
   {
      userRepository = new FakeUserRepository();
      listProviders = new ListProvidersService(
         userRepository
      );
   });


   it('should list all providers', async () => 
   {
      await userRepository.create({
         name: 'Pedro',
         email: 'pedro@mail.com',
         password: 'afro',
         is_provider: true
      });

      await userRepository.create({
         name: 'Weber',
         email: 'weber@mail.com',
         password: 'pua',
         is_provider: true
      });

      const me = await userRepository.create({
         name: 'Gabriel',
         email: 'gabriel@mail.com',
         password: 'code',
         is_provider: true
      });

      const providers = await listProviders.run({ user_id: me.id });
      expect(providers?.length).toBeGreaterThan(0);
   });
});
