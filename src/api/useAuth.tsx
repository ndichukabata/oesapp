
import AuthContext from "./AuthProvider";
import { useContext, useDebugValue } from 'react';

// Define the shape of your auth object
interface Auth {
    otpRequired: string;
    token: any;
    accessToken: any;
    username?: string;
    // add other auth properties here
}

// Define the context value type
interface AuthContextType {
    auth: Auth;
    isAuthenticated: boolean;
    setAuth?: React.Dispatch<React.SetStateAction<any>>;
}



const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { auth } = context;

    useDebugValue(auth, auth => (auth?.username ? "Logged In" : "Logged Out"));

    return context;
};

export default useAuth;
