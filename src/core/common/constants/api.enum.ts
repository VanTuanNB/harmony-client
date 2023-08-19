import environment from '@/environments/environment';

export const AUTH_API_SOCIAL = {
    URL_GOOGLE: `${environment.apiUrl}/${environment.prefix}/${environment.version}/auth/google`,
    URL_FACEBOOK: `${environment.apiUrl}/${environment.prefix}/${environment.version}/auth/facebook`,
};
