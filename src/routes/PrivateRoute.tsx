import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../api/useAuth.tsx';
import { isTokenExpired } from '../api/isTokenExpired.tsx';

const PrivateRoute: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const { auth, isAuthenticated } = useAuth();
    console.log(auth);
    console.log(isAuthenticated);

    if (!auth?.accessToken || isTokenExpired(auth?.accessToken)) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    if (auth?.otpRequired == "1") {
        return <Navigate to="/otp" replace />;
    }


    return isAuthenticated ? children : <Navigate to="/auth/sign-in" replace />;

};

export default PrivateRoute;