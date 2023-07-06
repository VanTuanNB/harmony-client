import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/core/redux/store.redux';
import { IAlbum } from '@/core/common/interfaces/index.interface';
import { EScopeSongStore, ESelectReducer } from '@/core/common/constants/index.constant';

const initialState: IAlbum = {
    _id: '',
    composerReference: '',
    title: '',


};

export const albumSlice = createSlice({
    name: ESelectReducer.SONG,
    initialState,
    reducers: {
        pushListSuggestSongIntoStore: (state, action: PayloadAction<IAlbum[]>) => {
            state..suggests = action.payload;
        },
    },
});
export const { pushListSuggestSongIntoStore } = albumSlice.actions;
export const selectSongReducer = (state: RootState) => state[ESelectReducer.SONG];
export default albumSlice;
