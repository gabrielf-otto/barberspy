import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';


class ForgotPasswordController {
   static async store(request: Request, response: Response) 
   {
      const { email } = request.body;

      const forgotPasswordEmail = await container.resolve(ForgotPasswordEmailService);
      await forgotPasswordEmail.run({
         email
      });

      return response.send();
   }
}


export default ForgotPasswordController;
