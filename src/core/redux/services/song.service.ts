import { ECookieStorage } from '@/core/common/constants/common.constant';
import { ISearch } from '@/core/common/interfaces/collection.interface';
import { IResponseServer, ISong } from '@/core/common/interfaces/index.interface';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { rootSplitApi } from './index.service';

interface Post {
    albumReference: string[];
    composerReference: string;
    genresReference: string[];
    performers: string;
    publish: Date;
    title: string;
    uploadId: string;
}

interface IToken {
    accessToken: string;
    refreshToken: string;
}
const localStoreInstance = new LocalStorageSide();
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN);
export const songApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceSongs: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => `/song/${param ?? ''}`,
        }),
        getServiceSongById: builder.query<IResponseServer<ISong>, string>({
            query: (param?: string) => `/song/${param ?? ''}`,
        }),
        getServiceSearch: builder.query<IResponseServer<ISearch>, string>({
            query: (param?: string) => ({
                url: '/song/search/',
                params: { title: param ?? '' },
            }),
        }),
        getSuggestSong: builder.query<IResponseServer<ISong[]>, { page: number; size: number }>({
            query: (params: { page: number; size: number }) => `/song/suggest?page=${params.page}&size=${params.size}`,
        }),
        getStreamSong: builder.query<string, string>({
            query: (param?: string) => ({
                url: `/song/stream/${param ?? ''}`,
                responseHandler: async (response) => URL.createObjectURL(await response.blob()),
            }),
        }),
        getServiceSongsJustReleased: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => ({
                url: '/song/released',
                params: { item: param ?? '' },
            }),
        }),
        getServiceSongsViewTop: builder.query<IResponseServer<ISong[]>, string>({
            query: (param?: string) => ({
                url: '/song/songTop',
                params: { item: param ?? '' },
            }),
        }),
        postCreateSong: builder.mutation<IResponseServer, Partial<Post>>({
            query: (body) => ({
                url: '/song/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token.refreshToken}`,
                },
                body,
            }),
        }),
        putUpdateSong: builder.mutation<IResponseServer, Partial<ISong>>({
            query: (song) => ({
                url: `/song/${song._id ?? ''}`,
                method: 'PUT',
                body: song,
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
                },
            })
        }),
        postIncreaseConcurrencyViewSong: builder.mutation<IResponseServer<undefined>, string>({
            query: (slug: string) => ({
                url: `/song/increase/${slug}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        })
    })
})

export const {
    useGetServiceSongsQuery,
    useGetSuggestSongQuery,
    useGetStreamSongQuery,
    usePostCreateSongMutation,
    useGetServiceSongsJustReleasedQuery,
    useGetServiceSongsViewTopQuery,
    usePostIncreaseConcurrencyViewSongMutation,
    usePutUpdateSongMutation,
    useGetServiceSearchQuery,
    useGetServiceSongByIdQuery,
} = songApi;

