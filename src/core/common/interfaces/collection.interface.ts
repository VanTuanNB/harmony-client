export interface IUser {}

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
    composerReference: string;
    listSong?: string[];
    information?: string;
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
