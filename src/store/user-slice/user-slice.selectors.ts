import { SerializedError } from '@reduxjs/toolkit';
import { AuthStatus } from '../../config/consts';
import { UserWithContactsInterface } from '../../interfaces/users.Interface';
import { State } from '../store';
import { LoadingStatus } from './user-slice.interface';

export const getUserData = (state: State): UserWithContactsInterface => state.userReducer.userInfo;
export const getUserInfoLoadingStatus = (state: State): LoadingStatus  => state.userReducer.loading;
export const getUserInfoError = (state: State): null | SerializedError => state.userReducer.error;
export const getAuthStatus = (state: State): AuthStatus => state.userReducer.authStatus;