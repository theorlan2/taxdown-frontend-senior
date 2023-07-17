import { applyMiddleware } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";
//
import saga from '../services/sagas/createSagas'
//
import rootReducer from './feactures';

const persistConfig = {
    key: 'taxdownFrontendSeniorChallenge',
    storage: storage,
    blacklist: []
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware];

applyMiddleware(sagaMiddleware)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(middleware),
});

sagaMiddleware.run(saga);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
