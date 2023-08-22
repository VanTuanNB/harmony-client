import { EContentTypeObjectS3, ROLE_CUSTOMER } from '../constants/common.constant';

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
    playlistReference?: IPlaylist[];
    favoriteListReference?: IFavorite;
    historyReference?: IHistory;
    isRegistrationForm?: boolean;
    role: ROLE_CUSTOMER;
    nickname?: string;
    albumsReference?: IAlbum[];
    songsReference?: ISong[];
    isPendingUpgradeComposer?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISong {
    _id: string;
    title: string;
    thumbnailUrl: string;
    userReference: IUser;
    thumbnail: {
        bucketName: string;
        keyObject: string;
        contentType: EContentTypeObjectS3;
    };
    audio: {
        bucketName: string;
        keyObject: string;
        contentType: EContentTypeObjectS3.AUDIO;
    };
    publish: string;
    albumReference?: IAlbum[];
    genresReference: IGenre[];
    performers: IUser[];
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
    userReference: IUser;
    listSong: ISong[];
    thumbnailUrl: string | null;
    thumbnail: {
        bucketName: string;
        keyObject: string;
        contentType: string;
    } | null;
    information?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IGenre {
    _id: string;
    title: string;
    thumbnailUrl?: string;
    listSong?: ISong[];
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
    listSong: ISong[];
    createdAt?: string;
    updatedAt?: Date;
}

export interface IFavorite {
    _id: string;
    listSong: ISong[];
    userReference: IUser;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IPlaylist {
    _id: string;
    title: string;
    listSong: ISong[];
    userReference: IUser;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ISearch{
    albums: IAlbum[];
    songs: ISong[];
    performers: IUser[]
}