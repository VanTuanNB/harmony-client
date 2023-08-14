export enum EScopeClientStore {
    LOCAL_STORAGE = 'localStoreSide',
    SESSION_STORAGE = 'sessionStoreSide',
    COOKIE = 'cookieSide',
}

export enum ELocalStorageKey {
    DATA_THEME = 'data-theme',
    VOLUME = 'volume',
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
