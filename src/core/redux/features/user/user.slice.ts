import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/core/redux/store.redux';
import { IUserStore } from '@/core/common/interfaces/index.interface';
import { ESelectReducer } from '@/core/common/constants/index.constant';

const initialState: IUserStore = {
    _id: '',
    email: '',
    name: '',
    refreshToken: '',
    avatarUrl: undefined,
    composerReference: undefined,
    favoriteListReference: undefined,
    historyReference: undefined,
    isRegistrationForm: false,
    locale: undefined,
    password: undefined,
    playlistReference: undefined,
    createdAt: undefined,
    updatedAt: undefined,
};

export const userSlice = createSlice({
    name: ESelectReducer.USER,
    initialState,
    reducers: {
        changeNameAction: (state, action: PayloadAction<Pick<IUserStore, 'name'>>) => {
            state.name = action.payload.name;
        },
    },
});
export const { changeNameAction } = userSlice.actions;
export const selectUserReducer = (state: RootState) => state[ESelectReducer.USER];
export default userSlice;
