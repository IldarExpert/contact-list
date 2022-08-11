import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ApiRoute, AuthStatus, USER_1, USER_2 } from '../../config/consts';
import { getUserUrl } from '../../config/userUrl';
import { getToken, saveToken } from '../../helpers/token';
import { UserWithContactsInterface } from '../../interfaces/users.Interface';
import { State } from '../store';
import { authorizeUserPayloadInterface, UserSliceInterface } from './user-slice.interface';

const initialState: UserSliceInterface = {
    authStatus: AuthStatus.Unknown,
    userInfo: null,
    loading: 'idle',
    error: null,
};

export const fetchUserInfo = createAsyncThunk(
    '@@users/fetchUsers',
    async (_, {rejectWithValue, extra}): Promise<UserWithContactsInterface | undefined> => {
        try {
            const userUrl = getUserUrl();
            const {client} = extra as { client: AxiosInstance };
            const {data} = await client.get<UserWithContactsInterface>(`${ApiRoute.Users}/${userUrl}`);
            return data;
        } catch (e) {
            rejectWithValue('Ошибка запроса, попробуйте повторить запрос ещё раз.');
        }
    },
);

export const patchContact = createAsyncThunk(
    '@@users/patchContact',
    async ({contactId, newContactData}: { contactId: number, newContactData: Record<string, unknown> }, {
        rejectWithValue,
        extra,
        getState
    }): Promise<UserWithContactsInterface | undefined> => {
        try {
            const userUrl = getUserUrl();
            const {client} = extra as { client: AxiosInstance };
            const {userReducer} = getState() as State;
            const contacts = userReducer.userInfo.contacts.map((contact) => {
                if (contact.id === contactId) {
                    return {
                        ...contact,
                        email: newContactData.contactEmail,
                        name: newContactData.contactName,
                    }
                }
                return contact;
            })
            const newUserData = {...userReducer.userInfo, contacts}
            const {data} = await client.patch<UserWithContactsInterface>(`${ApiRoute.Users}/${userUrl}`, newUserData);
            return data;
        } catch (e) {
            rejectWithValue('Ошибка запроса, попробуйте повторить запрос ещё раз.');
        }
    },
);

export const addContact = createAsyncThunk(
    '@@users/addContact',
    async (newContactData: Record<string, unknown>, {
        rejectWithValue,
        extra,
        getState
    }): Promise<UserWithContactsInterface | undefined> => {
        try {
            const userUrl = getUserUrl();
            const {client} = extra as { client: AxiosInstance };
            const {userReducer} = getState() as State;
            const newContact = {
                id: Date.now(),
                name: newContactData.contactName,
                email: newContactData.contactEmail
            }
            const contacts = [newContact, ...userReducer.userInfo.contacts];
            const newUserData = {...userReducer.userInfo, contacts}
            const {data} = await client.patch<UserWithContactsInterface>(`${ApiRoute.Users}/${userUrl}`, newUserData);
            return data;
        } catch (e) {
            rejectWithValue('Ошибка запроса, попробуйте повторить запрос ещё раз.');
        }
    },
);

export const deleteContact = createAsyncThunk(
    '@@users/deleteContact',
    async (contactId: number, {rejectWithValue, extra, getState}): Promise<UserWithContactsInterface | undefined> => {
        try {
            const userUrl = getUserUrl();
            const {client} = extra as { client: AxiosInstance };
            const {userReducer} = getState() as State;
            const contacts = userReducer.userInfo.contacts.filter((contact) => contact.id !== contactId)
            const newUserData = {...userReducer.userInfo, contacts}
            const {data} = await client.patch<UserWithContactsInterface>(`${ApiRoute.Users}/${userUrl}`, newUserData);
            return data;
        } catch (e) {
            rejectWithValue('Ошибка запроса, попробуйте повторить запрос ещё раз.');
        }
    },
);

const userSlice = createSlice({
    name: '@@favorites',
    initialState,
    reducers: {
        authorizeUser: (state, action: PayloadAction<authorizeUserPayloadInterface>) => {
            if (action.payload.email !== USER_1 && action.payload.email !== USER_2) {
                state.error = {message: `Пользователь ${action.payload} не зарегистрирован. (есть ${USER_1}, ${USER_2})`}
                state.authStatus = AuthStatus.NoAuth;
            } else {
                saveToken(action.payload.email);
                state.authStatus = AuthStatus.Auth;
            }
        },
        updateAuthStatus: (state, action) => {
            state.authStatus = action.payload;
        },
        checkAuthStatus: (state) => {
            const token = getToken();
            if (token) {
                state.authStatus = AuthStatus.Auth
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo = action.payload;
                }
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo = action.payload;
                }
            })
            .addCase(patchContact.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo = action.payload;
                }
            })
            .addCase(addContact.fulfilled, (state, action) => {
                if (action.payload) {
                    state.userInfo = action.payload;
                }
            })
            .addMatcher((action) => action.type.endsWith('pending'), (state, action) => {
                state.loading = 'pending';
            })
            .addMatcher((action) => action.type.endsWith('rejected'), (state, action) => {
                state.loading = 'idle';
                state.error = action.error || action.meta.error;
            })
            .addMatcher((action) => action.type.endsWith('fulfilled'), (state, action) => {
                state.loading = 'idle';
                state.error = null;
            });
    },
});

export const userReducer = userSlice.reducer;
export const {authorizeUser, updateAuthStatus, checkAuthStatus} = userSlice.actions;