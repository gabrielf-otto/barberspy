import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadAvatarService from '@modules/users/services/UploadAvatarService';


class AvatarController {
   static async update(request: Request, response: Response) 
   {
      // console.log(request.file);
      const uploadAvatar = container.resolve(UploadAvatarService);

      const user = await uploadAvatar.run({
         user_id: request.user.id,
         avatar: request.file.filename
      });

      return response.json(user);
   }
}


export default AvatarController;
