import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from '../helpers/token';
import { store } from '../store/store';
import { updateAuthStatus } from '../store/user-slice/user-slice';
import { AuthStatus } from './consts';

const PORT = 5000;
const BACKEND_URL = `http://localhost:${PORT}`;
const REQUEST_TIMEOUT = 5000;

type UnauthorizedCallback = () => void;

export const createAPI = (onUnauthorized: UnauthorizedCallback): AxiosInstance => {
    const api = axios.create({
        baseURL: BACKEND_URL,
        timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const token = getToken();

            if(!token) {
                // onUnauthorized()
            }

            return config;
        },
    );

    return api;
};

export const api = createAPI(() => store.dispatch(updateAuthStatus(AuthStatus.NoAuth)));