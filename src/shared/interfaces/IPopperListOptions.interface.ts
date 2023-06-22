import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IPopperListOptions {
    icon: IconProp;
    title: string;
    href?: string;
    hrefLang?: string;
    children?: {
        title: string;
        data: IPopperListOptions[];
    };
    separate?: boolean;
}
