import { ROLE_CUSTOMER } from '../constants/common.constant';
export interface IProfile {
    _id: string;
    email: string;
    name: string;
    avatarUrl: string;
    locale?: string;
    role: ROLE_CUSTOMER;
    nickname?: string;
}
export interface IUserStore {
    profile: IProfile | null;
}
