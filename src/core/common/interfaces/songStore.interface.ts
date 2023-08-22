import { EScopeSongStore, EStateCurrentSong, EStrategiesPlaying } from '../constants/common.constant';
import { ISong } from './index.interface';

export interface ISongStore {
    [EScopeSongStore.PLAYING]: {
        [EScopeSongStore.CURRENT_SONG]: ISong;
        [EScopeSongStore.STATE]: EStateCurrentSong;
        [EScopeSongStore.VOLUME]: number;
        [EScopeSongStore.STRATEGIES]: EStrategiesPlaying;
    };
    [EScopeSongStore.PLAYLIST]: {
        [EScopeSongStore.PREV_SONGS]: ISong[];
        [EScopeSongStore.NEXT_SONGS]: ISong[];
        [EScopeSongStore.SUGGESTS]: ISong[];
    };
    [EScopeSongStore.HISTORIES]: [];
}
