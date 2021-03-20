import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';


interface IRequest {
   email: string;
   password: string;
}

interface IResponse {
   user: User;
   token: string;
}

@injectable()
class SessionService 
{
   constructor(
      @inject('UserRepository')
      private repository: IUserRepository,

      @inject('HashProvider')
      private hashProvider: IHashProvider
   ) 
   {}

   async run({ email, password }: IRequest): Promise<IResponse> 
   {
      const user = await this.repository.findByEmail(email);
      if (!user) 
      {
         throw new AppError(
            'Invalid email/password combination'
         );
      }

      const match = await this.hashProvider.compare(password, user.password);
      if (!match) 
      {
         throw new AppError(
            'Invalid email/password combination'
         );
      }

      const token = sign({}, authConfig.jwt.secret, {
         subject: user.id,
         expiresIn: authConfig.jwt.expiresIn
      });

      return {
         user: classToClass(user),
         token
      }
   }
}


export default SessionService;
