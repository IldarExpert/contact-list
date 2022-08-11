import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { api } from '../config/api';
import { userReducer } from './user-slice/user-slice';

export const store = configureStore({
    reducer: {
        userReducer: userReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddlware) => getDefaultMiddlware({
        thunk: {
            extraArgument: {
                client: api,
            },
        },
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type State = RootState;

export const useAppDispatch: () => AppDispatch = useDispatch;