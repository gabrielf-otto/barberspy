import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
   height: 100vh;

   > header {
      height: 140px;
      background-color: #28262e;

      display: flex;
      align-items: center;

      div {
         width: 100%;
         max-width: 1120px;
         margin: 0 auto;

         svg {
            color: #999591;
            width: 26px;
            height: 26px;
         }
      }
   }
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   width: 100%;
   margin: -170px auto 0 auto;

   img {
      width: 250px;
   }

   form {
      margin: 80px 0;
      width: 340px;
      display: flex;
      flex-direction: column;
      text-align: center;

      h1 {
         margin-bottom: 24px;
         font-size: 20px;
         text-align: left;
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
`;

export const AvatarInput = styled.div`
   margin-bottom: 35px;
   width: 176px;
   position: relative;

   align-self: center;

   img {
      width: 176px;
      height: 176px;

      border-radius: 50%;
   }

   label {
      position: absolute;
      width: 48px;
      height: 48px;
      right: 0;
      bottom: 0;
      cursor: pointer;

      background-color: #11CDEF;
      border-radius: 50%;
      border: 0;
      transition: background-color .2s;

      display: flex;
      align-items: center;
      justify-content: center;

      input {
         display: none;
      }

      svg {
         width: 20px;
         height: 20px;
         color: #312e38;
      }

      &:hover {
         background-color: ${shade(.2, '#11CDEF')};    
      }

   }
`;
