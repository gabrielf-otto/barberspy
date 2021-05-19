import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
   
`;

export const Header = styled.header`
   padding: 30px 0;
   background-color: #28262e;
`;

export const HeaderContent = styled.div`
   max-width: 1120px;
   margin: 0 auto;
   display: flex;
   align-items: center;

   > img {
      height: 76px;
   }

   button {
      margin-left: auto;
      background: transparent;
      border: 0;

      svg {
         color: #999591;
         width: 20px;
         height: 20px;
      }
   }
`;

export const Profile = styled.div`
   display: flex;
   align-items: center;
   margin-left: 80px;

   img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
   }

   div {
      display: flex;
      flex-direction: column;
      margin-left: 15px;
      line-height: 24px;

      span {
         color: #f4ede8;
      }

      strong {
         color: #11CDEF;
         font-weight: 500;
      }

      a {
         text-decoration: none;
         transition: opacity .2s;

         &:hover {
            opacity: 0.6;
         }
      }
   }
`;

export const Content = styled.div`
   max-width: 1120px;
   margin: 50px auto;
   display: flex;
`;

export const Schedule = styled.div`
   flex: 1;
   margin-right: 120px;

   h1 {
      font-size: 36px;
   }

   p {
      margin-top: 8px;
      color: #11CDEF;
      display: flex;

      span {
         display: flex;
      }

      span + span {
         margin-left: 8px;
         padding-left: 8px;
         border-left: 1px solid #11CDEF;
      }
   }
`;

export const NextAppointment = styled.div`
   margin-top: 60px;

   > strong {
      color: #999591;
      font-size: 20px;
      font-weight: 400;
   }

   div {
      background-color: #3b3b47;
      display: flex;
      align-items: center;

      padding: 15px 25px;
      border-radius: 5px;
      margin-top: 25px;
      position: relative;

      &::before {
         content: '';
         background-color: #11CDEF;
         width: 2px;
         height: 70%;
         position: absolute;
         left: 0;
      }

      img {
         width: 76px;
         height: 76px;
         border-radius: 50%;
      }

      strong {
         margin-left: 25px;
         font-weight: 500;
         color: #fff;
      }

      span {
         margin-left: auto;
         display: flex;
         align-items: center;

         svg {
            margin-right: 5px;
            color: #11CDEF;
         }
      }
   }
`;

export const Appointment = styled.div`
   display: flex;
   align-items: center;

   & + div {
      margin-top: 15px;
   }

   span {
      margin-left: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      svg {
         margin-bottom: 5px;
         font-size: 36px;
         color: #11CDEF;
      }
   }

   div {
      background-color: #3b3b47;
      display: flex;
      align-items: center;

      padding: 15px 25px;
      border-radius: 5px;
      margin-left: 25px;

      flex: 1;
   }

   img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
   }

   strong {
      margin-left: 25px;
      font-size: 20px;
      font-weight: 500;
      color: #fff;
   }
`;

export const Section = styled.div`
   margin-top: 50px;

   > p {
      color: #999591;
   }

   > strong {
      color: #999591;
      font-size: 20px;
      line-height: 26px;
      border-bottom: 1px solid #3b3b47; 
      display: block;
      padding-bottom: 15px; 
      margin-bottom: 15px; 
   }
`;

export const Calendar = styled.div`
   width: 380px;

   .DayPicker {
    background: #28262e;
    border-radius: 5px;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }

  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 5px;
    color: #fff;
  }
  
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
  }

  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #11CDEF !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;
