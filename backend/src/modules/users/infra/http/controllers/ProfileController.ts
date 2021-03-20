import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';


class ProfileController {
   static async show(request: Request, response: Response): Promise<Response> 
   {
      const showProfile = container.resolve(ShowProfileService);
      const user = await showProfile.run({ id: request.user.id });
      return response.json(user);
   }

   static async update(request: Request, response: Response): Promise<Response> 
   {
      const user_id = request.user.id;
      const { 
         name, 
         email, 
         old_password,
         new_password 
      } = request.body;

      const updateProfile = container.resolve(UpdateProfileService);
      const user = await updateProfile.run(
      {
         user_id,
         name,
         email,
         old_password,
         new_password
      });

      return response.status(200).json(user);
   }
}


export default ProfileController;
