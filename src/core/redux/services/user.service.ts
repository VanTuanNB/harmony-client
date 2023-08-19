import { IResponseServer, IUser } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const userApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceProfile: builder.query<IResponseServer<IUser>, string>({
            query: (id: string) => `/user/${id}`,
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
    }),
});

export const { useGetServiceProfileQuery, usePostSignUpVerifyMutation, usePostSignUpCompletedMutation } = userApi;
