import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/store';
import { Auth, AuthState } from './authState.model';
import { StatusFetch } from '@/models/enums';

const authInitialState: AuthState = {
    isLogged: false,
    statusFetch: StatusFetch.SUCCESS,
    messageError: "",
    dataAuth: {} as Auth
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        saveAuth: (state, payload: PayloadAction<Auth>) => {
            state.dataAuth = payload.payload;
        },
        clearAuth: (state, payload: PayloadAction) => {
            state.dataAuth = {} as Auth;
            state.isLogged = false;
        },
        statusAuthFetch: (state, payload: PayloadAction<StatusFetch>) => {
            state.statusFetch = payload.payload;
            state.messageError = "";
        },
        statusAuthErrorFetch: (state, payload: PayloadAction<string>) => {
            state.messageError = payload.payload;
        },
        setIsLogged: (state, payload: PayloadAction<boolean>) => {
            state.isLogged = payload.payload;
        },
    }
});


export const {
    saveAuth,
    clearAuth,
    statusAuthFetch,
    statusAuthErrorFetch,
    setIsLogged
} = authSlice.actions



// selectors
const authSelector = (state: RootState) => state.auth;

export const selectDataAuth = createSelector(authSelector, state => state.dataAuth);
export const selectIsLoadingFetchAuth = createSelector(authSelector, state => state.statusFetch === StatusFetch.LOADING);
export const selectIsErrorFetchAuth = createSelector(authSelector, state => state.statusFetch === StatusFetch.ERROR);
export const selectMessageErrorFetchAuth = createSelector(authSelector, state => state.messageError);

// reducer
export default authSlice.reducer;