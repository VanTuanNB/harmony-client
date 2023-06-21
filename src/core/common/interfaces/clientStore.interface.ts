import { EScopeClientStore } from '../constants/common.constant';
import { EDataTheme } from '../constants/reduxSlice.constant';

export interface IClientStore {
    [EScopeClientStore.LOCAL_STORAGE]: {
        [key: string]: string;
        ['data-theme']: EDataTheme;
    };
    [EScopeClientStore.SESSION_STORAGE]: {
        [key: string]: string;
    };
    [EScopeClientStore.COOKIE]: {
        [key: string]: string;
    };
}

export interface IClientStoreSide {
    getStore(key: string): { [key: string]: any };
    setStore<T>(key: string, value: T, options?: { expires: number }): void;
}
