import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import api from '../../services/api';

import { toast } from 'react-toastify';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Container, Content, SlideRight, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import barberspyLogo from '../../assets/barberspyLogo.png';



interface IFormInputs {
   email: string;
}

const schema = yup.object().shape(
{
   email: yup.string().email('Email inválido').required('Email obrigatório'),
});

const ForgotPassword: React.FC = () => {
   const [loading, setLoading] = useState(false);

   const { register, handleSubmit, errors } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
   });


   const submitRequest = useCallback(async ({ email }: IFormInputs) => {
      try {
         setLoading(true);

         await api.post('/password/forgot', {
            email
         });

         toast.success('E-mail de recuperação de senha enviado');
      }
      catch (err) {
         toast.error('Falha no envio do email de recuperação de senha');
      }
      finally {
         setLoading(false);
      }
   },
   [loading]);


   return (
      <Container>
         <Content>
            <SlideRight>
               <img src={barberspyLogo} alt="Barberspy"/>

               <form autoComplete="off" onSubmit={handleSubmit(submitRequest)}>
                  <h2>Recuperação de senha</h2>

                  <Input 
                     register={register}
                     error={errors.email?.message}
                     name="email" 
                     icon={FiMail} 
                     placeholder="E-mail"
                  />

                  <Button loading={loading} type="submit">Enviar</Button>
               </form>

               <Link to="/signin">
                  <FiLogIn />
                  Fazer login
               </Link>
            </SlideRight>
         </Content>

         <Background />
      </Container>
   );
}


export default ForgotPassword;
