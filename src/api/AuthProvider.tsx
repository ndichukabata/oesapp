import { createContext, useState } from "react";


interface AuthContextType {
  auth: any;
  setAuth?: React.Dispatch<React.SetStateAction<any>>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: undefined,
  isAuthenticated: false,
});

import type { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    console.log(localStorage.getItem('eostoken'));
    
    const token = localStorage.getItem('eostoken')? localStorage.getItem('eostoken'): null;

    console.log(token);
    const isAuthenticated = !!localStorage.getItem('eostoken');
    
    const [auth, setAuth] = useState(JSON.parse(token ?? '{}'));

    return (
        <AuthContext.Provider value={{ auth, setAuth,isAuthenticated  }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
