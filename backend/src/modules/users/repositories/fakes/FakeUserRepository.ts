import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';


interface IRequest {
   name: string;
   email: string;
   password: string;
   is_provider?: boolean;
}

class FakeUserRepository implements IUserRepository {
   private users: User[] = [];

   public async create({ name, email, password, is_provider }: IRequest): Promise<User> {
      const user = new User();

      Object.assign(user, {
         id: uuid(),
         name,
         email,
         password,
         is_provider
      });

      this.users.push(user);
      return user;
   }

   async save(user: User): Promise<User> {
      const index = this.users.findIndex(obj => obj.id === user.id);
      this.users[index] = user;
      return user;
   }

   async findById(id: string): Promise<User | undefined> {
      return this.users.find(user => user.id === id);
   }

   async findByEmail(email: string): Promise<User | undefined> {
      return this.users.find(user => user.email === email);
   }

   async findAllProviders({ except_current_user_id }: IFindAllProvidersDTO): Promise<User[]> {
      return this.users.filter(user => user.is_provider === true && user.id !== except_current_user_id);
   }
}


export default FakeUserRepository;
