import { EScopeSongStore, EStateCurrentSong } from '../constants/common.constant';
import { ISong } from './index.interface';

export interface ISongStore {
    [EScopeSongStore.PLAYING]: {
        [EScopeSongStore.CURRENT_SONG]: ISong;
        [EScopeSongStore.STATE]: EStateCurrentSong;
        [EScopeSongStore.VOLUME]: number;
    };
    [EScopeSongStore.PLAYLIST]: {
        [EScopeSongStore.PREV_SONGS]: ISong[];
        [EScopeSongStore.NEXT_SONGS]: ISong[];
        [EScopeSongStore.SUGGESTS]: ISong[];
    };
    [EScopeSongStore.HISTORIES]: [];
}
