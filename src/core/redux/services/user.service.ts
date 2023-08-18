import { IResponseServer, IUser } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const userApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceProfile: builder.query<IResponseServer<IUser>, string>({
            query: (id: string) => `/user/${id}`,
        }),
    }),
});

export const { useGetServiceProfileQuery } = userApi;
