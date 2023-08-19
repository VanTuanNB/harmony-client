import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ELocalStorageKey, EScopeClientStore } from '@/core/common/constants/common.constant';
import { ESelectReducer } from '@/core/common/constants/index.constant';
import { EDataTheme } from '@/core/common/constants/reduxSlice.constant';
import { IUserToken } from '@/core/common/interfaces/cookieStore.interface';
import { IClientStore } from '@/core/common/interfaces/index.interface';
import type { RootState } from '@/core/redux/store.redux';
import { LocalStorageSide } from '@/utils/clientStore.util';

// init instance
const localStoreInstance = new LocalStorageSide();

const initialState: IClientStore = {
    [EScopeClientStore.LOCAL_STORAGE]: {
        [ELocalStorageKey.DATA_THEME]:
            (localStoreInstance.getStore(ELocalStorageKey.DATA_THEME) as EDataTheme.LIGHT & EDataTheme.DARK) ??
            EDataTheme.DARK,
        [ELocalStorageKey.VOLUME]: '1',
        [ELocalStorageKey.HARMONY_USER_TOKEN]: localStoreInstance.getStore(ELocalStorageKey.HARMONY_USER_TOKEN) ?? null,
    },
    [EScopeClientStore.SESSION_STORAGE]: {},
    [EScopeClientStore.COOKIE]: {},
};
export const clientStoreSlice = createSlice({
    name: ESelectReducer.CLIENT_STORE,
    initialState,
    reducers: {
        changeGlobalThemes(state, actions: PayloadAction<{ theme: EDataTheme }>) {
            state.localStoreSide[ELocalStorageKey.DATA_THEME] = actions.payload.theme;
            localStoreInstance.setStore<EDataTheme>(ELocalStorageKey.DATA_THEME, actions.payload.theme);
        },
        setUserToken(state, actions: PayloadAction<IUserToken | null>) {
            state.localStoreSide[ELocalStorageKey.HARMONY_USER_TOKEN] = actions.payload;
            localStoreInstance.setStore<IUserToken | null>(ELocalStorageKey.HARMONY_USER_TOKEN, actions.payload);
        },
    },
});
export const { changeGlobalThemes, setUserToken } = clientStoreSlice.actions;
export const selectClientStoreReducer = (state: RootState) => state[ESelectReducer.CLIENT_STORE];
export default clientStoreSlice;
