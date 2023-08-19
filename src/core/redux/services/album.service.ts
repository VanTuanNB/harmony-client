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
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTIxMTAzMTcsImV4cCI6MTY5NDcwMjMxN30.vc-ALzbdEVA19Ri-Qa_pd9REcQFHzluAkKZva4S5IoA'
                },
                body,
            }),
        }),
        putServiceAlbum: builder.mutation<IResponseServer, Partial<IAlbum>>({
            query: (album) => ({
                url: `/album/${album._id ?? ''}`,
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTIxMTAzMTcsImV4cCI6MTY5NDcwMjMxN30.vc-ALzbdEVA19Ri-Qa_pd9REcQFHzluAkKZva4S5IoA',
                },
                body: album,
            })
        })
    })
})

export const { useGetServiceAlbumQuery, usePostCreateAlbumMutation, useGetServiceAlbumNewWeekQuery, usePutServiceAlbumMutation } = albumApi; 