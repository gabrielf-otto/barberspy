import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import UploadAvatarService from './UploadAvatarService';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';



let userRepository: IUserRepository;
let storageProvider: IStorageProvider;
let uploadAvatarService: UploadAvatarService;



describe('UploadAvatar', () => 
{
   beforeEach(() => 
   {
      userRepository = new FakeUserRepository();
      storageProvider = new FakeStorageProvider();
      
      uploadAvatarService = new UploadAvatarService(
         userRepository,
         storageProvider
      );
   });

   it('should save a file avatar', async () => 
   {
      const user = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      await uploadAvatarService.run({
         user_id: user.id,
         avatar: 'profile-picture.png'
      });

      expect(user.avatar).toBe('profile-picture.png');
   });

   it('should not find a user', async () => 
   {
      await expect(uploadAvatarService.run({
         user_id: '1',
         avatar: 'profile-picture.png'
      })
      ).rejects.toBeInstanceOf(AppError);
   });

   it('should delete user avatar property that had been set before', async () => 
   {
      const userRepository = new FakeUserRepository();

      const user = await userRepository.create({
         name: 'Gabriel',
         email: 'gabrielf.otto@hotmail.com',
         password: '223600'
      });

      const del = jest.spyOn(storageProvider, 'delete');

      const uploadAvatarService = new UploadAvatarService(
         userRepository,
         storageProvider
      );

      await uploadAvatarService.run({
         user_id: user.id,
         avatar: 'profile-picture.png'
      });

      await uploadAvatarService.run({
         user_id: user.id,
         avatar: 'my-pic.png'
      });

      expect(del).toHaveBeenCalledWith('profile-picture.png');
      expect(user.avatar).toBe('my-pic.png');
   });
});
