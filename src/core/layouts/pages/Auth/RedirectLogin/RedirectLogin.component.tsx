'use client';
import { ECookieStorage } from '@/core/common/constants/common.constant';
import { IUserToken } from '@/core/common/interfaces/cookieStore.interface';
import { setUserToken } from '@/core/redux/features/client/client.slice';
import { updateProfile } from '@/core/redux/features/user/user.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import LoadingPage from '@/shared/components/Loading/LoadingPage/LoadingPage.component';
import { CookieStorageSide } from '@/utils/clientStore.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function RedirectLogin() {
    const router = useRouter();
    const rawData = new CookieStorageSide().getStore(ECookieStorage.HARMONY_USER_TOKEN) as any;
    const info = rawData[ECookieStorage.HARMONY_USER_TOKEN] as IUserToken;

    const { data, error, isLoading, refetch, isFetching } = useGetServiceProfileQuery(info ? info._id : '', {
        refetchOnMountOrArgChange: true,
    });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoading && !data) {
            refetch();
            return;
        }
        if (data && data.success) {
            dispatch(
                updateProfile({
                    _id: data.data._id,
                    email: data.data.email,
                    avatarUrl: data.data.avatarUrl ?? '',
                    name: data.data.name,
                    role: data.data.role,
                    nickname: data.data.nickname,
                    locale: data.data.locale,
                }),
            );
            dispatch(setUserToken(info));
            router.replace('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!info || Object.keys(info).length === 0) router.replace('/auth/login');
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info]);

    return (
        <>
            <LoadingPage />
        </>
    );
}

export default RedirectLogin;
