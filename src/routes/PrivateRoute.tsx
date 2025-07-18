import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../api/useAuth.tsx';
import { isTokenExpired } from '../api/isTokenExpired.tsx';
import { useLocation } from 'react-router-dom';
const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { auth, isAuthenticated } = useAuth();
      const location = useLocation();
    console.log(auth);
    console.log(isAuthenticated);
    console.log(location.pathname);
    

    if (!auth?.accessToken || isTokenExpired(auth?.accessToken)) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if (auth?.otpRequired == "1" && location.pathname !="/auth/two-factor") {
        return <Navigate to="/auth/two-factor" replace />;
    }


    return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;

};

export default PrivateRoute;