export enum EScopeClientStore {
    LOCAL_STORAGE = 'localStoreSide',
    SESSION_STORAGE = 'sessionStoreSide',
    COOKIE = 'cookieSide',
}

export enum ELocalStorageKey {
    DATA_THEME = 'data-theme',
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
}

export enum EStateCurrentSong {
    PLAYING = 'playing',
    PAUSED = 'paused',
    LOADING = 'loading',
    FAILED = 'failed',
}
