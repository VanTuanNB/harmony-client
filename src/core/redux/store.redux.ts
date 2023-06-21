import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { batchedSubscribe } from 'redux-batched-subscribe';
import userSlice from './features/user/user.slice';
import { ESelectReducer } from '../common/constants/reduxSlice.constant';
import clientStoreSlice from './features/client/client.slice';

export const store = configureStore({
    reducer: {
        [ESelectReducer.USER]: userSlice.reducer,
        [ESelectReducer.CLIENT_STORE]: clientStoreSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [batchedSubscribe((notify) => notify())],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
