import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';


class NotificationRepository implements INotificationsRepository {
   private repository: MongoRepository<Notification>;

   constructor() {
      this.repository = getMongoRepository(Notification, 'mongo');
   }

   async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> 
   {
      const notification = await this.repository.create({
         content,
         recipient_id
      });

      await this.repository.save(notification);
      return notification;
   }
}


export default NotificationRepository;
