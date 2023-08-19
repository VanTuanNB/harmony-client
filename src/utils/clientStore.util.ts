'use client';
import { IClientStoreSide } from '@/core/common/interfaces/index.interface';

export class LocalStorageSide implements IClientStoreSide {
    getStore(key: string): any {
        const store = typeof window !== 'undefined' ? JSON.parse(window.localStorage.getItem(key) || 'null') : null;
        return store;
    }
    setStore<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

export class sessionStorageSide implements IClientStoreSide {
    getStore(key: string): any {
        const store = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem(key) || 'null') : null;
        return store;
    }
    setStore<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
}

export class CookieStorageSide implements IClientStoreSide {
    getStore(key: string): { [key: string]: any } {
        if (typeof document === 'undefined') return {};
        let keyEQ = key + '=';
        const arrSegmentCookie = document.cookie.split(';');
        for (let i = 0; i < arrSegmentCookie.length; i++) {
            let charts = arrSegmentCookie[i];
            while (charts.charAt(0) == ' ') charts = charts.substring(1, charts.length);
            if (charts.indexOf(keyEQ) === 0)
                return { [key]: JSON.parse(decodeURIComponent(charts.substring(keyEQ.length, charts.length))) };
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
