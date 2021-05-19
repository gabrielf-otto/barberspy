import { useLocation } from 'react-router-dom';


export const useQuery = (name: string) => {
   return new URLSearchParams(useLocation().search).get(name);
}
