import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/core/redux/store.redux';
import { ISongStore } from '@/core/common/interfaces/index.interface';
import { EScopeSongStore, ESelectReducer } from '@/core/common/constants/index.constant';

const initialState: ISongStore = {
    [EScopeSongStore.PLAYING]: null,
    [EScopeSongStore.PLAYLIST]: {
        [EScopeSongStore.PREV_SONGS]: [],
        [EScopeSongStore.NEXT_SONGS]: [],
        [EScopeSongStore.SUGGESTS]: [],
    },
    [EScopeSongStore.HISTORIES]: [],
};

export const songSlice = createSlice({
    name: ESelectReducer.SONG,
    initialState,
    reducers: {},
});
// export const { changeNameAction } = songSlice.actions;
export const selectSongReducer = (state: RootState) => state[ESelectReducer.SONG];
export default songSlice;
