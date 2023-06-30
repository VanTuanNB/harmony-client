export interface IUserStore {
    _id: string;
    email: string;
    name: string;
    refreshToken: string;
    password?: string;
    avatarUrl?: string;
    locale?: string;
    playlistReference?: string[];
    favoriteListReference?: string;
    historyReference?: string;
    isRegistrationForm: boolean;
    composerReference?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
