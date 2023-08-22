import { ECookieStorage } from '@/core/common/constants/common.constant';
import { IHistory, IResponseServer } from '@/core/common/interfaces/index.interface';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { rootSplitApi } from './index.service';

interface IToken {
    accessToken: string;
    refreshToken: string;
}
const localStoreInstance = new LocalStorageSide();
const token: IToken = localStoreInstance.getStore(ECookieStorage.HARMONY_USER_TOKEN);
console.log('token', token);
export const historyApi = rootSplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getHistoryByUserId: builder.query<IResponseServer<IHistory>, void>({
            query: () => ({
                method: 'GET',
                url: `/history/`,
                headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                },
            }),
        }),
    }),
});

export const { useGetHistoryByUserIdQuery } = historyApi;
