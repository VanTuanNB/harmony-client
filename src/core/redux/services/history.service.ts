import { ECookieStorage } from "@/core/common/constants/common.constant";
import { IHistory, IResponseServer } from "@/core/common/interfaces/index.interface";
import { LocalStorageSide } from "@/utils/clientStore.util";
import { rootSplitApi } from "./index.service";

interface IToken {
    accessToken: string;
    refreshToken: string
}
const localStoreInstance = new LocalStorageSide()
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN)
export const historyApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistoryByUserId: builder.query<IResponseServer<IHistory[]>, string>({
            query: (param?: string) => ({
                url: `/favorite/${param ?? ''}`,
                headers: {
                    'Authorization': `Bearer ${token.refreshToken}`
                },
            })
        }),
    })
})

export const { useGetHistoryByUserIdQuery } = historyApi;