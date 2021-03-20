import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';


interface IRequest {
   id?: string;
   name: string;
   email: string;
   password: string;
   is_provider?: boolean;
}

@injectable()
class CreateUserService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider,

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider
   ) 
   {}

   async run({ name, email, password, is_provider }: IRequest): Promise<User> 
   {
      const record = await this.userRepository.findByEmail(email);
      if (record) 
      {
         throw new AppError(
            'E-mail address already exists'
         );
      }

      const user = this.userRepository.create({ 
         name, 
         email, 
         password: await this.hashProvider.generate(password),
         is_provider
      });

      if (is_provider) {
         await this.cacheProvider.invalidatePrefix('providers-list');
      }

      return classToClass(user);
   }

}


export default CreateUserService;
