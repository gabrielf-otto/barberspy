import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';


interface Request {
   user_id: string;
   avatar: string;
}

@injectable()
class UploadAvatarService 
{
   constructor(
      @inject('UserRepository')
      private repository: IUserRepository,

      @inject('StorageProvider')
      private storageProvider: IStorageProvider
   ) 
   {}

   async run({ user_id, avatar }: Request): Promise<User> 
   {
      const user = await this.repository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token',
         );
      }

      if (user.avatar) {
         this.storageProvider.delete(user.avatar);
      }

      const fileName = await this.storageProvider.save(avatar);
      user.avatar = fileName;

      user.avatar = avatar;
      await this.repository.save(user);

      return classToClass(user);
   }
}


export default UploadAvatarService;
