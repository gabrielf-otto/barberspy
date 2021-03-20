import { ObjectId } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';


class NotificationRepository implements INotificationsRepository {
   private notifications: Notification[] = [];

   async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> 
   {
      const notification = new Notification();

      Object.assign(notification, {
         id: new ObjectId(),
         content, 
         recipient_id,
         // read: false,
         // created_at: new Date,
         // updated_at: new Date 
      });

      this.notifications.push(notification);
      return notification;
   }
}


export default NotificationRepository;
