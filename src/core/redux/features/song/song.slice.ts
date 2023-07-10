import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/core/redux/store.redux';
import { ISong, ISongStore } from '@/core/common/interfaces/index.interface';
import { EScopeSongStore, ESelectReducer } from '@/core/common/constants/index.constant';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';

const initialState: ISongStore = {
    [EScopeSongStore.PLAYING]: {
        [EScopeSongStore.CURRENT_SONG]: {} as ISong,
        [EScopeSongStore.STATE]: EStateCurrentSong.LOADING,
    },
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
    reducers: {
        // suggest store
        pushListSuggestSongIntoStore: (state, action: PayloadAction<ISong[]>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.SUGGESTS] = action.payload;
        },
        removeSongFromSuggestList: (state, action: PayloadAction<{ _id: string }>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.SUGGESTS] = state[EScopeSongStore.PLAYLIST][
                EScopeSongStore.SUGGESTS
            ].filter((song: ISong) => song._id !== action.payload._id);
        },

        // prev store
        pushSongIntoPrevPlayList: (state, action: PayloadAction<ISong>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.PREV_SONGS].push(action.payload);
        },

        // playing store
        startPlaying: (state, action: PayloadAction<ISong>) => {
            state[EScopeSongStore.PLAYING][EScopeSongStore.CURRENT_SONG] = action.payload;
            state[EScopeSongStore.PLAYING][EScopeSongStore.STATE] = EStateCurrentSong.LOADING;
        },
    },
});
export const { pushListSuggestSongIntoStore, pushSongIntoPrevPlayList, removeSongFromSuggestList, startPlaying } =
    songSlice.actions;
export const selectSongReducer = (state: RootState) => state[ESelectReducer.SONG];
export default songSlice;
