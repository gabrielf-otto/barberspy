import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import multer from 'multer';

import uploadConfig from '@config/upload';
import auth from '@modules/users/infra/middlewares/auth';

import UserController from '@modules/users/infra/http/controllers/UserController';
import AvatarController from '@modules/users/infra/http/controllers/AvatarController';


const usersRouter = Router();
const upload = multer(uploadConfig);



usersRouter.get('/users', UserController.index);

usersRouter.post('/users', 
   celebrate({
      [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required(),
         is_provider: Joi.boolean()
      }
   }),

UserController.store);


usersRouter.patch('/avatar', auth, upload.single('avatar'), AvatarController.update);   


export default usersRouter;
