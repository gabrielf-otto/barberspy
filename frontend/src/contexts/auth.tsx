import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';


interface ISignIn {
   email: string;
   password: string;
}

interface IUser {
   id: string;
   name: string;
   email: string;
   avatar: string;
   avatar_url: string;
}

interface IAuth {
   user: IUser;
   token: string;
}

export interface IAuthContext {
   user: IUser;
   signIn: (data: ISignIn) => Promise<void>;
   signOut: () => void;
   updateUser: (user: IUser) => void;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);


export const AuthProvider: React.FC = ({ children }) => {
   const [data, setData] = useState<IAuth>(() => 
   {
      const user = localStorage.getItem('@barberspy:user');
      const token = localStorage.getItem('@barberspy:token');

      if (user && token) 
      {
         api.defaults.headers.authorization = `Bearer ${token}`;
         return {
            user: JSON.parse(user),
            token
         }
      }

      return {} as IAuth;
   });

   const signIn = useCallback(async ({ email, password }: ISignIn) => 
   {
      const response = await api.post('/session', {
         email,
         password
      });

      const { user, token } = response.data;

      localStorage.setItem('@barberspy:user', JSON.stringify(user));
      localStorage.setItem('@barberspy:token', token);

      api.defaults.headers.authorization = `Bearer ${token}`;
      setData({ user, token });
   },
   []);

   const signOut = useCallback(() => 
   {
      localStorage.removeItem('@barberspy:user');
      localStorage.removeItem('@barberspy:token');

      setData({} as IAuth);
   },
   []);

   const updateUser = useCallback((user: IUser) => 
   {
      localStorage.setItem('@barberspy:user', JSON.stringify(user));
      setData({
         token: data.token,
         user: {...user}
      });
   },
   [setData]);
 
   return (
      <AuthContext.Provider value={{
         user: data.user, 
         signIn, 
         signOut, 
         updateUser
      }}>
         {children}
      </AuthContext.Provider>
   );
};
