import React, { useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Container, Content, SlideLeft, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import barberspyLogo from '../../assets/barberspyLogo.png';

import api from '../../services/api';


interface IFormInputs {
   name: string;
   email: string;
   password: string;
}

const schema = yup.object().shape(
{
   name: yup.string().required('Nome obrigatório'),
   email: yup.string().email('Email inválido').required('Email obrigatório'),
   password: yup.string().required('Senha obrigatória')
});

const SignUp: React.FC = () => {
   const { register, handleSubmit, errors } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
   });

   const history = useHistory();


   const signUp = useCallback(async (data: IFormInputs) => {
      try {
         await api.post('/users', data);
         history.push('/');
         toast.success('Você já pode fazer seu logon');
      }
      catch (err) {
         toast.error('Falha ao cadastrar');
      }
   },
   [history]);

   return (
      <Container>
         <Background />

         <Content>
            <SlideLeft>
               <img 
                  src={barberspyLogo} 
                  alt="Barberspy"
               />

               <form autoComplete="off" onSubmit={handleSubmit(signUp)}>
                  <h1>Faça seu cadastro</h1>

                  <Input 
                     register={register} 
                     error={errors.name?.message}
                     name="name" 
                     icon={FiUser} 
                     placeholder="Nome"
                  />

                  <Input 
                     register={register} 
                     error={errors.email?.message}
                     name="email" 
                     icon={FiMail} 
                     placeholder="E-mail"
                  />

                  <Input 
                     register={register}
                     error={errors.password?.message} 
                     name="password" 
                     icon={FiLock} 
                     type="password" 
                     placeholder="Senha"
                  />

                  <Button type="submit">Cadastrar</Button>
               </form>

               <Link to="/signin">
                  <FiArrowLeft />
                  Voltar
               </Link>
            </SlideLeft>
         </Content>
      </Container>
   );
}


export default SignUp;
