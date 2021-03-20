import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';


interface IRequest {
   id: string;
}

@injectable()
class ShowProfileService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository
   ) 
   {}

   async run({ id }: IRequest): Promise<User | undefined> 
   {
      const user = await this.userRepository.findById(id);
      if (!user) 
      {
         throw new AppError(
            'Invalid JWT token'
         );
      }

      return classToClass(user);
   }
}


export default ShowProfileService;
