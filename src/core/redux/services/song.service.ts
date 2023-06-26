import { ISong } from '@/core/common/interfaces/index.interface';
import { rootSplitApi } from './index.service';

export const songApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceSongs: builder.query<ISong, string>({
            query: (param?: string) => `song/${param ?? ''}`,
        }),
    }),
});

export const { useGetServiceSongsQuery } = songApi;
