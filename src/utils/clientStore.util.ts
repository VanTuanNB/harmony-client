import { IClientStoreSide } from '@/core/common/interfaces/index.interface';

export class LocalStorageSide implements IClientStoreSide {
    getStore(key: string): any {
        if (typeof window === 'undefined') return null;
        const store = JSON.parse(window.localStorage.getItem(key) || 'null');
        return store;
    }
    setStore<T>(key: string, value: T): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }
}

export class sessionStorageSide implements IClientStoreSide {
    getStore(key: string): any {
        if (typeof window === 'undefined') return null;
        const store = JSON.parse(window.sessionStorage.getItem(key) || 'null');
        return store;
    }
    setStore<T>(key: string, value: T): void {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }
}

export class CookieStorageSide implements IClientStoreSide {
    getStore(key: string): { [key: string]: any } {
        let keyEQ = key + '=';
        const arrSegmentCookie = document.cookie.split(';');
        for (let i = 0; i < arrSegmentCookie.length; i++) {
            let charts = arrSegmentCookie[i];
            while (charts.charAt(0) == ' ') charts = charts.substring(1, charts.length);
            if (charts.indexOf(keyEQ) === 0) return { [key]: charts.substring(keyEQ.length, charts.length) };
        }
        return {};
    }
    setStore<T>(key: string, value: T, options?: { expires: number } | undefined): void {
        let timeExpires: string = '';
        if (options && options.expires) {
            const date = new Date();
            date.setTime(date.getTime() + options.expires * 24 * 60 * 60 * 1000);
            timeExpires = '; expires=' + date.toUTCString();
        }
        document.cookie = key + '=' + value + timeExpires + '; path=/';
    }
}
