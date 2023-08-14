import { faBan, faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
import { IPopperListOptions } from '../interfaces/IPopperListOptions.interface';

const MENU_SETTINGS: IPopperListOptions[] = [
    {
        icon: faHome,
        title: 'Home settings',
        href: '/dashboard',
    },
    {
        icon: faUser,
        title: 'Profile',
        href: '/profile',
    },
    {
        icon: faRightFromBracket,
        title: 'Log out',
        href: '/logout',
    },
];

const USER_SETTINGS: IPopperListOptions[] = [
    {
        icon: faBan,
        title: 'Danh sách chặn',
        children: {
            title: 'Nested Setting',
            data: [
                {
                    icon: faBan,
                    title: 'Nested Setting',
                },
                {
                    icon: faBan,
                    title: 'Nested Setting2',
                },
            ],
        },
    },
];

export { MENU_SETTINGS, USER_SETTINGS };

export enum EDurationSong {
    DEFAULT = '00:00',
}
