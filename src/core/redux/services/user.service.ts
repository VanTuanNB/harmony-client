import { IResponseServer, IUser } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { ECookieStorage } from '@/core/common/constants/common.constant';

interface IToken {
    accessToken: string;
    refreshToken: string
}
const localStoreInstance = new LocalStorageSide()
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN)
export const userApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceUserRoleComposer: builder.query<IResponseServer<IUser[]>, void>({
            query: () => `/user/composer`,
        }),
        getServiceProfile: builder.query<IResponseServer<IUser>, string>({
            query: (id?: string) => `/user/${id ?? ''}`,
        }),
        postSignUpVerify: builder.mutation<IResponseServer, { email: string; password: string; username: string }>({
            query: (body: { email: string; password: string; username: string }) => ({
                url: '/user/sendCode',
                method: 'POST',
                body,
            }),
        }),
        postSignUpCompleted: builder.mutation<IResponseServer, { email: string; verificationCode: number }>({
            query: (body: { email: string; verificationCode: number }) => ({
                url: '/user/signupForm',
                method: 'POST',
                body,
            }),
        }),
        getServicePerformer: builder.query<IResponseServer<IUser>, string>({
            query: (param?: string) => `/user/composer/${param ?? ''}`,
        }),
        putServiceProfile: builder.mutation<IResponseServer, Partial<IUser>>({
            query: (user) => ({
                url: `/user/profile/`,
                method: 'PUT',
                body: user,
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
                },
            }),
        }),
    }),
});

export const {
    useGetServiceProfileQuery,
    usePostSignUpVerifyMutation,
    usePostSignUpCompletedMutation,
    useGetServiceUserRoleComposerQuery,
    useGetServicePerformerQuery,
    usePutServiceProfileMutation,
} = userApi;
