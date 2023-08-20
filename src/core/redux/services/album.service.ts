import { ECookieStorage } from "@/core/common/constants/common.constant";
import { IAlbum, IResponseServer } from "@/core/common/interfaces/index.interface";
import { LocalStorageSide } from "@/utils/clientStore.util";
import { rootSplitApi } from "./index.service";

interface IToken {
    accessToken: string;
    refreshToken: string
}
const localStoreInstance = new LocalStorageSide()
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN)
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
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
                },
            }),
        }),
        putServiceAlbum: builder.mutation<IResponseServer, Partial<IAlbum>>({
            query: (album) => ({
                url: `/album/${album._id ?? ''}`,
                method: 'PUT',
                body: album,
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
                },
            })
        })
    })
})

export const { useGetServiceAlbumQuery, usePostCreateAlbumMutation, useGetServiceAlbumNewWeekQuery, usePutServiceAlbumMutation } = albumApi; 