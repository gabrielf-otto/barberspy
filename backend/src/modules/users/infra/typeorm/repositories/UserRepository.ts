import { getRepository, Repository, Not } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User'; 
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';


interface IRequest {
   name: string;
   email: string;
   password: string;
   is_provider?: boolean;
}

class UserRepository implements IUserRepository {
   private repository: Repository<User>

   constructor() {
      this.repository = getRepository(User);
   }

   async create({ name, email, password, is_provider }: IRequest): Promise<User> {
      const user = await this.repository.create({
         name,
         email,
         password,
         is_provider
      });

      await this.repository.save(user);
      return user;
   }

   async save(user: User): Promise<User> {
      return await this.repository.save(user);
   }
   
   async findById(id: string): Promise<User | undefined> {
      return await this.repository.findOne(id);  
   }

   async findByEmail(email: string): Promise<User | undefined> {
      return await this.repository.findOne({ where: { email } });  
   }

   async findAllProviders({ except_current_user_id }: IFindAllProvidersDTO): Promise<User[]> {
      return await this.repository.find({ where: { is_provider: true, id: Not(except_current_user_id) } });
   }
}


export default UserRepository;
