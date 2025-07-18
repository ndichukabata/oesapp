import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
const useAxiosPrivate = () => {
      const navigate = useNavigate();
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    useEffect(() => {
        if (auth == null) {
            console.log('auth is null');

             navigate('/auth/sign-in');
            return;
        }

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken ?? auth?.token ?? ""}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                //&& !prevRequest?.sent
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    //  const newAccessToken = await refresh(auth);
                    // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                // && !prevRequest?.sent
             

                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                     const newAccessToken = await refresh({
                        accessToken: auth?.accessToken ?? "",
                        refreshToken: auth?.refreshToken ?? "",
                        tokenExpiration: auth?.tokenExpiration ?? "",
                        usertype: auth?.usertype ?? "",
                        active: auth?.active ?? false,
                        firstname: auth?.firstname ?? "",
                        lastname: auth?.lastname ?? "",
                        username: auth?.username ?? "",
                        roles: auth?.roles ?? []
                    });
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;

