import { faBan, faHome } from '@fortawesome/free-solid-svg-icons';
import { IPopperListOptions } from '../interfaces/IPopperListOptions.interface';

const MENU_SETTINGS: IPopperListOptions[] = [
    {
        icon: faHome,
        title: 'Home settings',
        href: '/dashboard',
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
