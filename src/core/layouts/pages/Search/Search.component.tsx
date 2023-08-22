'use client';
import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceSearchQuery } from '@/core/redux/services/song.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import MediaItemInPage from '@/shared/components/MediaItemInPage/MediaItemInPage.component';
import { LocalStorageSide } from '@/utils/clientStore.util';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
const LocalStorageInstance = new LocalStorageSide();
function SearchPage() {
    const loginInfo = LocalStorageInstance.getStore(ELocalStorageKey.PROFILE);
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get('search_query');
    const { data, error, isLoading } = useGetServiceSearchQuery(search || '');
    const dispatch = useAppDispatch();

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (!loginInfo) {
            router.replace('/auth/login');
            return;
        }
        if (index > 0) {
            const prevSongs =
                (data &&
                    data.data.songs &&
                    data.data.songs.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (data &&
                data.data.songs &&
                data.data.songs.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };

    return (
        <div className={cx('search')}>
            <div className={cx('filter')}>
                <button>Tất cả</button>
            </div>

            <div className={cx('top-result')}>
                <div className={cx('result-left')}>
                    <h2>kết quả hàng đầu</h2>
                    {isLoading && <SkeletonLoading count={3} />}
                    {data && data.data.songs.length > 0 && (
                        <div onClick={() => onClick(data.data.songs[0], 0)} className={cx('left')}>
                            <Image
                                src={data.data.songs[0].thumbnailUrl}
                                alt=""
                                width={500}
                                height={500}
                                className={cx('img')}
                            />
                            <div className={cx('top-result-infor')}>
                                <h3>{data.data.songs[0].title}</h3>
                                {data.data.songs[0].performers.map((item) => (
                                    <p key={item._id}>{item.name}</p>
                                ))}
                            </div>
                        </div>
                    )}
                    {error && <SkeletonLoading count={3} />}
                </div>
                <div className={cx('result-right')}>
                    <h2>Bài hát liên quan</h2>
                    <div className={cx('right')}>
                        {isLoading && <SkeletonLoading count={2} />}
                        {data && data.data.songs.length > 0 && (
                            <ul className={cx('list-listening')}>
                                {data.data.songs.map((song, index) => {
                                    return (
                                        <li key={song._id} className={cx('item')}>
                                            <MediaItemInPage
                                                data={song}
                                                onClick={() => onClick(song, index)}
                                                key={song._id}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {error && <SkeletonLoading count={3} />}
                    </div>
                </div>
            </div>
            {data && data.data.performers.length > 0 && (
                <div className={cx('artist-result')}>
                    <h2>Ca sĩ liên quan</h2>
                    <div className={cx('item-artist')}>
                        {data.data.performers.map((item) => (
                            <Link href={'/composer/@' + item.nickname} key={item._id} className={cx('item')}>
                                <Image
                                    src={item.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    alt=""
                                    width={500}
                                    height={500}
                                    className={cx('img')}
                                />
                                <h3>{item.name}</h3>
                                <p>Ca sỹ - tác giả</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {data && data.data.albums.length > 0 && (
                <div className={cx('artist-result')}>
                    <h2>Album liên quan</h2>
                    <div className={cx('item-artist')}>
                        {data.data.albums.map((item) => (
                            <Link href={'/album/' + item._id} key={item._id} className={cx('item')}>
                                <Image
                                    src={item.thumbnailUrl || '/images/playlist.png'}
                                    alt=""
                                    width={500}
                                    height={500}
                                    className={cx('img')}
                                />
                                <h3>{item.title}</h3>
                                <p>{item.information}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
export default memo(SearchPage);
