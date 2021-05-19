import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signInBg from '../../assets/signInBg.png';


export const Container = styled.div`
   height: 100vh;
   display: flex;
   align-items: stretch;
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 100%;
   max-width: 700px;

   img {
      width: 250px;
   }
`;

const slideRight = keyframes`
   from {
      opacity: 0;
      transform: translateX(-50px);
   }
   to {
      opacity: 1;
      transform: translateX(0);
   }
`;

export const SlideRight = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   animation: ${slideRight} 1s ease;

   img {
      width: 250px;
   }

   form {
      margin: 80px 0;
      width: 340px;
      text-align: center;

      h1 {
         margin-bottom: 24px;
      }

      a {
         color: #f4ede8;
         display: block;
         margin-top: 25px;
         text-decoration: none;
         transition: color .2s;

         &:hover {
            color: ${shade(.2, '#f4ede8')};
         }
      }
   }

   > a {
      color: #11CDEF;
      margin-top: 25px;
      text-decoration: none;
      transition: color .2s;

      display: flex;
      align-items: center;

      svg {
         margin-right: 15px;
      }

      &:hover {
         color: ${shade(.2, '#11CDEF')};
      }
   }
`;


export const Background = styled.div`
   flex: 1;
   background: url(${signInBg}) no-repeat;
   background-size: cover;
`;
