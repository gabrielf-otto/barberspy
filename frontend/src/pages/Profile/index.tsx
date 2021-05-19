import React, { ChangeEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { FiArrowLeft, FiCamera, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Container, Content, AvatarInput } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';


interface IFormInputs {
   name: string;
   email: string;
   old_password: string;
   new_password: string;
   pass_confirm: string;
}

const schema = yup.object().shape(
{
   name: yup.string().required('Nome obrigatório'),
   email: yup.string().email('Email inválido').required('Email obrigatório'),

   old_password: yup.string(),
   new_password: yup.string().when('old_password', 
   {
      is: (value: string) => !!value.length,
      then: yup.string().required('Campo obrigatório'),
      otherwise: yup.string()
   }),
   pass_confirm: yup.string().when('old_password', 
   {
      is: (value: string) => !!value.length,
      then: yup.string().required('Campo obrigatório'),
      otherwise: yup.string()
   })
   .oneOf([yup.ref('new_password'), null], 'Confirmação incorreta')
});

const Profile: React.FC = () => {
   const { user, updateUser } = useAuth();

   const { register, handleSubmit, errors } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
   });

   const updateAvatar = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) 
      {
         const data = new FormData();
         data.append('avatar', e.target.files[0]);
         
         api.patch('/avatar', data).then(response => {
            updateUser(response.data);
            toast.success('Avatar atualizado');
         });
      }
   },
   [updateUser]);

   const update = useCallback(async (data: IFormInputs) => {
      const {
         name,
         email,
         old_password,
         new_password,
         pass_confirm
      } = data;

      const userData = Object.assign({
         name,
         email
      },
      old_password && {
         old_password,
         new_password
      });

      try {
         const response = await api.put('/profile', userData);
         updateUser(response.data);
         toast.success('Perfil atualizado');
      }
      catch (err) {
         toast.error('Erro ao atualizar o perfil');
      }
   },
   [updateUser]);


   return (
      <Container>
         <header>
            <div>
               <Link to="/">
                  <FiArrowLeft />
               </Link>
            </div>
         </header>
         <Content>
            <form autoComplete="off" onSubmit={handleSubmit(update)}>
               <AvatarInput>
                  <img src={user.avatar_url} alt={user.name}/>
                  <label htmlFor="avatar">
                     <FiCamera />
                     <input 
                        type="file" 
                        id="avatar" 
                        onChange={updateAvatar}
                     />
                  </label>
               </AvatarInput>

               <h1>Meu perfil</h1>

               <Input 
                  register={register} 
                  defaultValue={user.name}
                  error={errors.name?.message}
                  name="name" 
                  icon={FiUser} 
                  placeholder="Nome"
               />

               <Input 
                  register={register} 
                  defaultValue={user.email}
                  error={errors.email?.message}
                  name="email" 
                  icon={FiMail} 
                  placeholder="E-mail"
               />

               <br />
               <Input 
                  register={register}
                  error={errors.old_password?.message} 
                  name="old_password" 
                  icon={FiLock} 
                  type="password" 
                  placeholder="Senha atual"
               />

               <Input 
                  register={register}
                  error={errors.new_password?.message} 
                  name="new_password" 
                  icon={FiLock} 
                  type="password" 
                  placeholder="Nova senha"
               /> 

               <Input 
                  register={register}
                  error={errors.pass_confirm?.message} 
                  name="pass_confirm" 
                  icon={FiLock} 
                  type="password" 
                  placeholder="Confirmar senha"
               /> 

               <Button type="submit">Salvar</Button>
            </form>
         </Content>
      </Container>
   );
}


export default Profile;
