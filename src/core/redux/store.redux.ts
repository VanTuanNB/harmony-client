import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { batchedSubscribe } from 'redux-batched-subscribe';

import { ESelectReducer } from '../common/constants/reduxSlice.constant';
import clientStoreSlice from './features/client/client.slice';
import songSlice from './features/song/song.slice';
import userSlice from './features/user/user.slice';
import { rootSplitApi } from './services/index.service';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: {
        [ESelectReducer.API_SERVICE]: rootSplitApi.reducer,
        [ESelectReducer.USER]: userSlice.reducer,
        [ESelectReducer.CLIENT_STORE]: clientStoreSlice.reducer,
        [ESelectReducer.SONG]: songSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootSplitApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: [batchedSubscribe((notify) => notify())],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
