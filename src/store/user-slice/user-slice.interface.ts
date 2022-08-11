import { SerializedError } from '@reduxjs/toolkit';
import { AuthStatus } from '../../config/consts';
import { UserWithContactsInterface } from '../../interfaces/users.Interface';

export type LoadingStatus = 'idle' | 'pending'

export interface UserSliceInterface {
    authStatus: AuthStatus
    userInfo: UserWithContactsInterface | null;
    loading: LoadingStatus;
    error: null | SerializedError;
}

export interface authorizeUserPayloadInterface {
    email: string;
    checked: boolean;
}