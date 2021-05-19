import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';


export default createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      outline: 0;
   }

   body {
      background-color: #312e38;
      color: #fff;
      -webkit-font-smoothing: antialiased;
   }

   body, input {
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      letter-spacing: .3px;
   }

   h1,h2,h3,h4,h5,h6 {
      font-family: 'Roboto Slab', serif;
      font-weight: 500;
      margin-bottom: 20px;
   }

   button {
      cursor: pointer;
      font-size: 16px;
      font-family: 'Roboto Slab', serif;
   }
`;
