import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';


interface IRequest {
   user_id: string;
}

@injectable()
class ListProvidersService 
{
   constructor(
      @inject('UserRepository')
      private userRepository: IUserRepository,

      @inject('CacheProvider')
      private cacheProvider: ICacheProvider
   ) 
   {}

   async run({ user_id }: IRequest): Promise<User[]> 
   {
      let providers = await this.cacheProvider.get<User[]>(`providers-list:${user_id}`);
      if (!providers) 
      {
         providers = await this.userRepository.findAllProviders({
            except_current_user_id: user_id
         });

         await this.cacheProvider.set(`providers-list:${user_id}`, providers);
      }

      return providers;
   }
}


export default ListProvidersService;
