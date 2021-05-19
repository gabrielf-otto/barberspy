import styled from 'styled-components';


export const Container = styled.div`
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;

   span {
      width: 150px;
      background-color: #11CDEF;
      padding: 8px;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      visibility: hidden;
      color: #312e38;

      opacity: 0;
      transition: opacity .4s;

      position: absolute;
      bottom: calc(100% + 7px);
      left: 50%;
      transform: translateX(-50%);

      color: #312e38;

      &::before {
         content: '';
         border-style: solid;
         border-color: #11CDEF transparent;
         border-width: 6px 6px 0 6px;
         bottom: 20px;
         top: 100%;
         position: absolute;
         left: 50%;
         transform: translateX(-50%);
      }
   }

   &:hover span {
      opacity: 1;
      visibility: visible;
   }
`;
