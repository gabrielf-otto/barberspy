import styled, { css } from 'styled-components';
import { shade } from 'polished';


interface IProps {
   loading?: boolean;
}

export const Container = styled.button<IProps>`
   background-color: #11CDEF;
   height: 56px;
   border-radius: 5px;
   border: 0;
   padding: 0 15px;
   color: #312e38;
   font-weight: 500;
   margin-top: 15px;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   transition: background-color .2s;

   &:hover {
      background-color: ${shade(.2, '#11CDEF')};
   }

   ${props => props.loading && css`
      cursor: not-allowed;
      background-color: ${shade(.2, '#11CDEF')};
   `}
`;
