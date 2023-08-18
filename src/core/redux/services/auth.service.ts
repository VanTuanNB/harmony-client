import { IResponseServer } from '@/core/common/interfaces/index.interface';
import { IProfile } from '@/core/common/interfaces/userStore.interface';
import { rootSplitApi } from './index.service';

export const authApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        authLoginForm: builder.mutation<
            IResponseServer<IProfile & { accessToken: string; refreshToken: string }>,
            { email: string; password: string }
        >({
            query: (body: { email: string; password: string }) => ({
                url: `/auth/loginForm`,
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useAuthLoginFormMutation } = authApi;
