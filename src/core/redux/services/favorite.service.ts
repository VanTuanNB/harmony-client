import { IFavorite } from "@/core/common/interfaces/collection.interface";
import { IResponseServer } from "@/core/common/interfaces/index.interface";
import { rootSplitApi } from "./index.service";

export const favoriteApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getFavoriteByUserId: builder.query<IResponseServer<IFavorite[]>, string>({
            query: (param?: string) => ({
                url: `/favorite/${param ?? ''}`,
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIyY2JiZTI2Yi0xNzNmLTRmZWUtYWY3Yy0xYzhmZGVlZGVlOWYiLCJlbWFpbCI6Imh1eWRlcHRyYWkxOTA2MjAwMkBnbWFpbC5jb20iLCJyb2xlIjoiY29tcG9zZXIiLCJpYXQiOjE2OTIxMTAzMTcsImV4cCI6MTY5NDcwMjMxN30.vc-ALzbdEVA19Ri-Qa_pd9REcQFHzluAkKZva4S5IoA'
                },
            })
        }),
    })
})

export const { useGetFavoriteByUserIdQuery } = favoriteApi;