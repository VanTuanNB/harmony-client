export enum EScopeClientStore {
    LOCAL_STORAGE = 'localStoreSide',
    SESSION_STORAGE = 'sessionStoreSide',
    COOKIE = 'cookieSide',
}

export enum ELocalStorageKey {
    DATA_THEME = 'data-theme',
    VOLUME = 'volume',
    HARMONY_USER_TOKEN = 'harmony_user_token',
    STRATEGIES = 'strategies ',
    PROFILE = 'profile',
}

export enum EScopeSongStore {
    PLAYING = 'playing',
    PLAYLIST = 'playlist',
    PREV_SONGS = 'prevSongs',
    NEXT_SONGS = 'nextSongs',
    SUGGESTS = 'suggests',
    HISTORIES = 'histories',
    CURRENT_SONG = 'currentSong',
    STATE = 'state',
    VOLUME = 'volume',
    PROFILE = 'profile',
    STRATEGIES = 'strategies',
}

export enum EStateCurrentSong {
    PLAYING = 'playing',
    PAUSED = 'paused',
    LOADING = 'loading',
    FAILED = 'failed',
}

export enum EContentTypeObjectS3 {
    AUDIO = 'audio/mpeg',
    JPEG = 'jpeg',
    JPG = 'jpg',
    PNG = 'png',
    AUDIO_EXTENSION = 'mp3',
}

export enum ECookieStorage {
    HARMONY_USER_TOKEN = 'harmony_user_token',
}

export enum ROLE_CUSTOMER {
    USER = 'user',
    ROOT_ADMIN = 'root_admin',
    COMPOSER = 'composer',
}

export enum EDateFormat {
    DD_MM_YYYY = 'dd/MM/yyyy',
    YYYY_MM_DD = 'yyyy/MM/dd',
}

export const REGEX = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

export enum EStrategiesPlaying {
    RANDOM = 'random',
    LOOP = 'loop',
    SEQUENTIALLY = 'sequentially',
}
