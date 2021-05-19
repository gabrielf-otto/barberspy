import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { FiLock, FiLogIn, FiMail } from 'react-icons/fi';
import { Container, Content, SlideRight, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import barberspyLogo from '../../assets/barberspyLogo.png';

import { useAuth } from '../../hooks/auth';


interface IFormInputs {
   email: string;
   password: string;
}

const schema = yup.object().shape(
{
   email: yup.string().email('Email inválido').required('Email obrigatório'),
   password: yup.string().required('Senha obrigatória')
});

const SignIn: React.FC = () => {
   const [loading, setLoading] = useState(false);

   const { register, handleSubmit, errors } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
   });

   const { signIn, user } = useAuth();
   const history = useHistory();


   const signInRequest = useCallback(async (data: IFormInputs) => {
      try {
         setLoading(true);
         await signIn(data);
         history.push('/');
      }
      catch (err) {
         toast.error('Falha no login');
      }
      finally {
         setLoading(false);
      }
   },
   [signIn, history]);


   return (
      <Container>
         <Content>
            <SlideRight>
               <img src={barberspyLogo} alt="Barberspy"/>

               <form autoComplete="off" onSubmit={handleSubmit(signInRequest)}>
                  <h1>Faça seu logon</h1>

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
                  <Button loading={loading} type="submit">Entrar</Button>

                  <Link to="/password/forgot">Esqueci minha senha</Link>
               </form>

               <Link to="/signup">
                  <FiLogIn />
                  Criar conta
               </Link>
            </SlideRight>
         </Content>

         <Background />
      </Container>
   );
}


export default SignIn;
