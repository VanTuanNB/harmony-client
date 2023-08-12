export interface IUser {
    _id: string;
    email: string;
    name: string;
    refreshToken: string;
    password?: string;
    avatarUrl?: string;
    avatarS3: {
        bucketName: string;
        keyObject: string;
        contentType: string;
    } | null;
    locale?: string;
    playlistReference?: string[];
    favoriteListReference?: string;
    historyReference?: string;
    isRegistrationForm?: boolean;
    role: string;
    nickname?: string;
    albumsReference?: string[];
    songsReference?: string[];
    isPendingUpgradeComposer?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISong {
    _id: string;
    title: string;
    thumbnail: string;
    composerReference: IComposer;
    songPathReference: ISongPath;
    publish: Date;
    albumReference?: IAlbum[];
    genresReference: IGenre[];
    performers: Array<IComposer>;
    views?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IComposer {
    _id: string;
    name: string;
    avatar?: string;
    nickname: string;
    country?: string;
    userReference: string;
    albumsReference?: string | string[];
    songsReference?: string | string[];
}

export interface IAlbum {
    _id: string;
    title: string;
    publish: Date;
    composerReference: IComposer;
    listSong?: string[];
    information?: string;
    thumbnail: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IGenre {
    _id: string;
    title: string;
    listSong?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISongPath {
    _id: string;
    path: string;
    size: number;
    duration: number;
    type: string;
}

export interface IHistory {
    _id: string;
    listSong: string[];
    createdAt?: string;
    updatedAt?: Date;
}
