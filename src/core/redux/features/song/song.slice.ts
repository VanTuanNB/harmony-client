import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ELocalStorageKey, EStateCurrentSong, EStrategiesPlaying } from '@/core/common/constants/common.constant';
import { EScopeSongStore, ESelectReducer } from '@/core/common/constants/index.constant';
import { ISong, ISongStore } from '@/core/common/interfaces/index.interface';
import type { RootState } from '@/core/redux/store.redux';
import { LocalStorageSide } from '@/utils/clientStore.util';

const localStorageSide = new LocalStorageSide();

const initialState: ISongStore = {
    [EScopeSongStore.PLAYING]: {
        [EScopeSongStore.CURRENT_SONG]: {} as ISong,
        [EScopeSongStore.STATE]: EStateCurrentSong.LOADING,
        [EScopeSongStore.VOLUME]: localStorageSide.getStore(ELocalStorageKey.VOLUME) ?? 1,
        [EScopeSongStore.STRATEGIES]: localStorageSide.getStore(ELocalStorageKey.STRATEGIES) ?? EStrategiesPlaying.LOOP,
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
        pushListSuggestSongIntoStoreAction: (state, action: PayloadAction<ISong[]>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.SUGGESTS] = state[EScopeSongStore.PLAYLIST][
                EScopeSongStore.SUGGESTS
            ].concat(action.payload);
        },
        removeSongFromSuggestListAction: (state, action: PayloadAction<string>) => {
            const index = state[EScopeSongStore.PLAYLIST][EScopeSongStore.SUGGESTS].findIndex(
                (song: ISong) => song._id === action.payload,
            );
            if (index === -1) return;
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.SUGGESTS].splice(index, 1);
        },

        // prev store
        popSongListPrevSong: (state, action: PayloadAction) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.PREV_SONGS].pop();
        },
        pushSongIntoPrevPlayListAction: (state, action: PayloadAction<ISong>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.PREV_SONGS].push(action.payload);
        },
        replaceIntoPrevPlayListAction: (state, action: PayloadAction<ISong[]>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.PREV_SONGS] = action.payload;
        },

        // playing store
        startPlayingAction: (state, action: PayloadAction<ISong>) => {
            state[EScopeSongStore.PLAYING][EScopeSongStore.CURRENT_SONG] = action.payload;
            state[EScopeSongStore.PLAYING][EScopeSongStore.STATE] = EStateCurrentSong.LOADING;
        },
        updateStatePlayingAction: (state, action: PayloadAction<EStateCurrentSong>) => {
            state[EScopeSongStore.PLAYING][EScopeSongStore.STATE] = action.payload;
        },
        changeVolumeAction: (state, action: PayloadAction<number>) => {
            localStorageSide.setStore(ELocalStorageKey.VOLUME, action.payload);
            state[EScopeSongStore.PLAYING][EScopeSongStore.VOLUME] = action.payload;
        },

        // nextSong
        replaceNewListNextSong: (state, action: PayloadAction<ISong[]>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.NEXT_SONGS] = action.payload;
        },
        unShiftListNextSong: (state, action: PayloadAction<ISong>) => {
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.NEXT_SONGS].unshift(action.payload);
        },
        shiftListNextSong: (state, action: PayloadAction<string>) => {
            const index = state[EScopeSongStore.PLAYLIST][EScopeSongStore.NEXT_SONGS].findIndex(
                (song: ISong) => song._id === action.payload,
            );
            if (index === -1) return;
            state[EScopeSongStore.PLAYLIST][EScopeSongStore.NEXT_SONGS].splice(index, 1);
        },

        // Playback mode song
        updatePlaybackMode: (state, action: PayloadAction<EStrategiesPlaying>) => {
            localStorageSide.setStore(ELocalStorageKey.STRATEGIES, action.payload);
            state[EScopeSongStore.PLAYING][EScopeSongStore.STRATEGIES] = action.payload;
        },
    },
});
export const {
    pushListSuggestSongIntoStoreAction,
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    startPlayingAction,
    updateStatePlayingAction,
    changeVolumeAction,
    shiftListNextSong,
    unShiftListNextSong,
    popSongListPrevSong,
    replaceNewListNextSong,
    replaceIntoPrevPlayListAction,
    updatePlaybackMode,
} = songSlice.actions;
export const selectSongReducer = (state: RootState) => state[ESelectReducer.SONG];
export default songSlice;
