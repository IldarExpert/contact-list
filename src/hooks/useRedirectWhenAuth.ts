import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthStatus } from '../config/consts';
import { getAuthStatus } from '../store/user-slice/user-slice.selectors';

export const UseRedirectWhenAuth = (path: string) => {
    const navigate = useNavigate();
    const authStatus = useSelector(getAuthStatus);

    useEffect(() => {
        if (authStatus === AuthStatus.Auth) {
            navigate(path);
        }
    }, [authStatus]);
}