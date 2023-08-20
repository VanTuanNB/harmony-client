import { IAlbum, IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const albumApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getServiceAlbum: builder.query<IResponseServer<IAlbum>, string>({
            query: (param?: string) => `/album/${param ?? ''}`,
        }),
        getServiceAlbumNewWeek: builder.query<IResponseServer<IAlbum[]>, string>({
            query: (param?: string) => ({
                url: `/album/newWeek`,
                params: { item: param ?? '' },
            }),
        }),
        postCreateAlbum: builder.mutation<IResponseServer, Partial<IAlbum>>({
            query: (body) => ({
                url: '/album/',
                method: 'POST',
                body,
            }),
        }),
        putServiceAlbum: builder.mutation<IResponseServer, Partial<IAlbum>>({
            query: (album) => ({
                url: `/album/${album._id ?? ''}`,
                method: 'PUT',
                body: album,
            })
        })
    })
})

export const { useGetServiceAlbumQuery, usePostCreateAlbumMutation, useGetServiceAlbumNewWeekQuery, usePutServiceAlbumMutation } = albumApi; 