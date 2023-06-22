import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/core/redux/store.redux';
import { ESelectReducer } from '@/core/common/constants/index.constant';
import { IClientStore } from '@/core/common/interfaces/index.interface';
import { EDataTheme } from '@/core/common/constants/reduxSlice.constant';
import { CookieStorageSide, LocalStorageSide, sessionStorageSide } from '@/utils/clientStore.util';
import { EScopeClientStore } from '@/core/common/constants/common.constant';

const initialState: IClientStore = {
    [EScopeClientStore.LOCAL_STORAGE]: {
        'data-theme': EDataTheme.DARK,
    },
    [EScopeClientStore.SESSION_STORAGE]: {},
    [EScopeClientStore.COOKIE]: {},
};
// init instance
const localStoreInstance = new LocalStorageSide();
const sessionStoreInstance = new sessionStorageSide();
const cookieStoreInstance = new CookieStorageSide();

export const clientStoreSlice = createSlice({
    name: ESelectReducer.CLIENT_STORE,
    initialState,
    reducers: {
        changeGlobalThemes(state, actions: PayloadAction<{ theme: EDataTheme }>) {
            state.localStorage['data-theme'] = actions.payload.theme;
            localStoreInstance.setStore<EDataTheme>(state.localStorage['data-theme'], actions.payload.theme);
        },
    },
});
export const { changeGlobalThemes } = clientStoreSlice.actions;
export const selectClientStoreReducer = (state: RootState) => state[ESelectReducer.CLIENT_STORE];
export default clientStoreSlice;