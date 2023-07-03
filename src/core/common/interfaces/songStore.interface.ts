import { EScopeSongStore } from '../constants/common.constant';
import { ISong } from './index.interface';

export interface ISongStore {
    [EScopeSongStore.PLAYING]: ISong | null;
    [EScopeSongStore.PLAYLIST]: {
        [EScopeSongStore.PREV_SONGS]: ISong[];
        [EScopeSongStore.NEXT_SONGS]: ISong[];
        [EScopeSongStore.SUGGESTS]: ISong[];
    };
    [EScopeSongStore.HISTORIES]: [];
}
