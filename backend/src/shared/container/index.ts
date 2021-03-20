import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ITokenRepository from '@modules/users/repositories/ITokenRepository';
import TokenRepository from '@modules/users/infra/typeorm/repositories/TokenRepository';

import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import NotificationRepository from '@modules/notifications/infra/typeorm/repositories/NotificationRepository';


container.registerSingleton<IUserRepository>(
   'UserRepository', 
   UserRepository
);

container.registerSingleton<ITokenRepository>(
   'TokenRepository', 
   TokenRepository
);

container.registerSingleton<IAppointmentRepository>(
   'AppointmentRepository', 
   AppointmentRepository
);

container.registerSingleton<INotificationRepository>(
   'NotificationRepository', 
   NotificationRepository
);
