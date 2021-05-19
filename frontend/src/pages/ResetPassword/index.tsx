import React, { useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useQuery } from '../../utils/useQuery';
import api from '../../services/api';

import { toast } from 'react-toastify';
import { FiLogIn, FiLock } from 'react-icons/fi';
import { Container, Content, SlideRight, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import barberspyLogo from '../../assets/barberspyLogo.png';


interface IFormInputs {
   password: string;
   confirm: string;
}

const schema = yup.object().shape(
{
   password: yup.string().required('Nova senha obrigatória'),
   confirm: yup.string().required('Confirmação de senha obrigatório'),
});

const ResetPassword: React.FC = () => {
   const [loading, setLoading] = useState(false);

   const token = useQuery('token');
   const history = useHistory();

   const { register, handleSubmit, errors } = useForm<IFormInputs>({
      resolver: yupResolver(schema)
   });


   const submitRequest = useCallback(async (data: IFormInputs) => {
      try {
         setLoading(true);
         await api.post(`/password/reset?token=${token}`, data);
      
         history.push('/');
         toast.success('Sua nova senha foi salva');
      }
      catch (err) {
         toast.error('Falha na recuperação de senha');
      }
      finally {
         setLoading(false);
      }
   },
   [token, history]);


   return (
      <Container>
         <Content>
            <SlideRight>
               <img src={barberspyLogo} alt="Barberspy"/>

               <form autoComplete="off" onSubmit={handleSubmit(submitRequest)}>
                  <h2>Recuperação de senha</h2>

                  <Input 
                     register={register}
                     error={errors.password?.message}
                     name="password" 
                     icon={FiLock} 
                     type="password"
                     placeholder="Nova senha"
                  />

                  <Input 
                     register={register}
                     error={errors.confirm?.message}
                     name="confirm" 
                     icon={FiLock} 
                     type="password"
                     placeholder="Confirmação de senha"
                  />

                  <Button loading={loading} type="submit">Salvar</Button>
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


export default ResetPassword;
