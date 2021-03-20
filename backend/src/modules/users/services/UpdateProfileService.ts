import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from "../infra/typeorm/entities/User";
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';


interface IRequest {
   user_id: string;
   name: string;
   email: string;
   old_password: string;
   new_password: string;
}

@injectable()
class UpdateProfileService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
   ) 
   {}

   async run({ user_id, name, email, old_password, new_password }: IRequest): Promise<User> 
   {
      const user = await this.userRepository.findById(user_id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      if (new_password && !(await this.hashProvider.compare(old_password, user.password))) 
      {
         throw new AppError(
            'Wrong current password'
         );
      }

      Object.assign(user, {
         name,
         email,
         password: new_password && await this.hashProvider.generate(new_password)
      });

      await this.userRepository.save(user);
      return classToClass(user);
   }
}


export default UpdateProfileService;
