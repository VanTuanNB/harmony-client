import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { EScopeSongStore, ESelectReducer } from '@/core/common/constants/index.constant';
import { IUserStore } from '@/core/common/interfaces/index.interface';
import { IProfile } from '@/core/common/interfaces/userStore.interface';
import type { RootState } from '@/core/redux/store.redux';
import { LocalStorageSide } from '@/utils/clientStore.util';

const localStoreInstance = new LocalStorageSide();
const initialState: IUserStore = {
    [EScopeSongStore.PROFILE]: localStoreInstance.getStore(EScopeSongStore.PROFILE) ?? null,
};

export const userSlice = createSlice({
    name: ESelectReducer.USER,
    initialState,
    reducers: {
        updateProfile(state: IUserStore, action: PayloadAction<IProfile | null>) {
            state[EScopeSongStore.PROFILE] = action.payload;
            localStoreInstance.setStore<IProfile | null>(EScopeSongStore.PROFILE, action.payload);
        },
    },
});
export const { updateProfile } = userSlice.actions;
export const selectUserReducer = (state: RootState) => state[ESelectReducer.USER];
export default userSlice;
