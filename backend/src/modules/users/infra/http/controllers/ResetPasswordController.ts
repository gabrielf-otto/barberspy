import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';


class ResetPasswordController {
   static async store(request: Request, response: Response) 
   {
      const { token } = request.query;
      const { 
         password, 
         confirm 
      } = request.body;

      const resetPassword = container.resolve(ResetPasswordService);
      await resetPassword.run(
      {
         token: token as string,
         password,
         confirm
      });

      return response.send();
   }
}


export default ResetPasswordController;
