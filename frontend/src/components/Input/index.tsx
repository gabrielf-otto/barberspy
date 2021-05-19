import React, { useState, useCallback, useRef, InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';

import { Container, Error } from './styles'; 


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string;
   icon?: React.ComponentType<IconBaseProps>;
   register?: any;
   error?: string;
}

const Input: React.FC<InputProps> = ({ children, icon: Icon, register, error, ...attrs }) => {
   const inputRef = useRef<HTMLInputElement | null>(null);

   const [isFocused, setIsFocused] = useState(false);
   const [isFilled, setIsFilled] = useState(false);

   const inputFocus = useCallback(() => {
      setIsFocused(true)
   },
   []);

   const inputBlur = useCallback(() => 
   {
      setIsFocused(false);
      setIsFilled(!!inputRef.current?.value);
   },
   []);

   const setRef = useCallback(ref => 
   {
      inputRef.current = ref;
      register(ref);
   },
   []);
   
   return (
      <Container isFocused={isFocused} isFilled={isFilled} hasError={!!error}>
         { Icon && <Icon size={20}/> }
         <input 
            {...attrs}
            ref={setRef}
            onFocus={inputFocus}
            onBlur={inputBlur}
         />

         { error && 
            <Error title={error}>
               <FiAlertCircle color="#c53030" />
            </Error>
         }
      </Container>
   )
};


export default Input;
