import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';


class UserController {
   static async index(request: Request, response: Response) {
      return response.json();
   }

   static async store(request: Request, response: Response) 
   {
      const { 
         name, 
         email, 
         password, 
         is_provider      
      } = request.body;

      const createUser = container.resolve(CreateUserService);
      const user = await createUser.run(
      {
         name,
         email,
         password,
         is_provider
      });

      return response.json(user);
   }
}


export default UserController;
