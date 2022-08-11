import { SerializedError } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UserWithContactsInterface } from '../interfaces/users.Interface';
import { useAppDispatch } from '../store/store';
import { fetchUserInfo } from '../store/user-slice/user-slice';
import { LoadingStatus } from '../store/user-slice/user-slice.interface';
import { getUserInfoLoadingStatus, getUserData, getUserInfoError } from '../store/user-slice/user-slice.selectors';

export const useFetchUserInfo = (): [UserWithContactsInterface, LoadingStatus, SerializedError] => {
    const appDispatch = useAppDispatch();
    const isLoading = useSelector(getUserInfoLoadingStatus);
    const error = useSelector(getUserInfoError)
    const data = useSelector(getUserData);

    useEffect(() => {
        appDispatch(fetchUserInfo());
    }, []);

    return [data, isLoading, error];
}