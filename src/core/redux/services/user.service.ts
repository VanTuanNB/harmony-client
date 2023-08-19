import { IResponseServer, IUser } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const userApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceUserRoleComposer: builder.query<IResponseServer<IUser[]>, void>({
            query: () => `/user/composer`,
        }),
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
        getServicePerformer: builder.query<IResponseServer<IUser>, string>({
            query: (param?: string) => `/user/composer/${param ?? ''}`,
        }),
        putServiceProfile: builder.mutation<IResponseServer, Partial<IUser>>({
            query: (user) => ({
                url: `/user/profile/${user._id ?? ''}`,
                method: 'PUT',
                headers: {
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTIxMTAzMTcsImV4cCI6MTY5NDcwMjMxN30.vc-ALzbdEVA19Ri-Qa_pd9REcQFHzluAkKZva4S5IoA',
                },
                body: user,
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
