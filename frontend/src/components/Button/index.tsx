import React, { ButtonHTMLAttributes } from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles'; 


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
   loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...attrs }) => (
   <Container loading={loading} {...attrs}>
      { loading? <ReactLoading type="spin" width={30} height={30} /> : children }
   </Container>
);


export default Button;
