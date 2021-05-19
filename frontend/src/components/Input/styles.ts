import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';


interface ContainerProps {
   isFocused: boolean;
   isFilled: boolean;
   hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
   background-color: #232129;
   border-radius: 5px;
   padding: 15px;
   width: 100%;
   margin-top: 10px;
   transition: all .2s;

   border: 2px solid #232129;
   color: #666360;

   display: flex;
   align-items: center;

   ${props => props.isFocused && css`
      border-color: #11CDEF;
      color: #11CDEF;
   `}

   ${props => props.isFilled && css`
      color: #11CDEF;
   `}

   ${props => props.hasError && css`
      border-color: #c53030;
   `}

   input {
      flex: 1;
      background: transparent;
      border: 0;
      color: #f4ede8;

      &::placeholder {
         color: #666360;
      }
   }

   > svg {
      margin-right: 15px;

      ${props => props.hasError && css`
         color: #c53030;
      `}
   }
`;

export const Error = styled(Tooltip)`
   height: 20px;
   margin-left: 15px;

   svg {
      margin: 0;
   }

   span {
      background-color: #c53030;
      color: #fff;

      &::before {
         border-color: #c53030 transparent;
      }
   }
`;
