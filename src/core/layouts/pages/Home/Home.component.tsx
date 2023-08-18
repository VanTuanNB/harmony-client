'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushListSuggestSongIntoStoreAction,
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceAlbumNewWeekQuery } from '@/core/redux/services/album.service';
import { useGetServiceGenreTopQuery } from '@/core/redux/services/genre.service';
import {
    useGetServiceSongsJustReleasedQuery,
    useGetServiceSongsViewTopQuery,
} from '@/core/redux/services/song.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { AlbumIcon } from '@/shared/components/Svg/index.component';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function HomePage() {
    const apiJustReleased = useGetServiceSongsJustReleasedQuery('6');
    const apiAlbumNewWeek = useGetServiceAlbumNewWeekQuery('4');
    const apiSongTop = useGetServiceSongsViewTopQuery('6');
    const apiSongTopView = useGetServiceSongsViewTopQuery('3');
    const apiGenreTop = useGetServiceGenreTopQuery('4');
    const dispatch = useAppDispatch();

    console.log(apiGenreTop.data);

    useEffect(() => {
        if (apiJustReleased.data) {
            dispatch(pushListSuggestSongIntoStoreAction(apiJustReleased.data.data));
        }
        if (apiSongTop.data) {
            dispatch(pushListSuggestSongIntoStoreAction(apiSongTop.data.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiJustReleased.data, apiSongTop.data]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };

    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
            </div>
            <div className={cx('main-just')}>
                <h3 className={cx('title')}>Bài hát vừa phát hành</h3>
                {apiJustReleased.isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>
                    {apiJustReleased.data?.data.map((song) => {
                        return (
                            <li key={song._id}>
                                <div className={cx('wrapper-media')}>
                                    <div className={cx('media')}>
                                        <div onClick={() => onClick(song._id)} className={cx('box-left')}>
                                            <div className={cx('thumbnail')}>
                                                <Image
                                                    src={song.thumbnailUrl}
                                                    alt="fallback img"
                                                    height={40}
                                                    width={40}
                                                    className={cx('img')}
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <h1 className={cx('title')}>{song.title}</h1>
                                                <h3 className={cx('performers')}>
                                                    {song.performers.map((item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={'/composer/@' + item.nickname}
                                                                className={cx('link-channel')}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={cx('box-right')}>
                                            <HeartComponent />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {apiJustReleased.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
                <h3 className={cx('title')}>Bài hát thịnh hành</h3>
                {apiSongTop.isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>
                    {apiSongTop.data?.data.map((song) => {
                        return (
                            <li key={song._id}>
                                <div className={cx('wrapper-media')}>
                                    <div className={cx('media')}>
                                        <div onClick={() => onClick(song._id)} className={cx('box-left')}>
                                            <div className={cx('thumbnail')}>
                                                <Image
                                                    src={song.thumbnailUrl}
                                                    alt="fallback img"
                                                    height={40}
                                                    width={40}
                                                    className={cx('img')}
                                                />
                                            </div>
                                            <div className={cx('info')}>
                                                <h1 className={cx('title')}>{song.title}</h1>
                                                <h3 className={cx('performers')}>
                                                    {song.performers.map((item, index) => {
                                                        return (
                                                            <Link
                                                                key={index}
                                                                href={'/composer/@' + item.nickname}
                                                                className={cx('link-channel')}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        );
                                                    })}
                                                </h3>
                                            </div>
                                        </div>
                                        <div className={cx('box-right')}>
                                            <HeartComponent />
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {apiSongTop.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
            <div className={cx('main-ranking')}>
                <h3>Top bài hát nghe nhiều nhất</h3>
                {apiSongTopView.isLoading && <SkeletonLoading count={3} />}
                <div className={cx('list-rank')}>
                    {apiSongTopView.data?.data.map((song, index) => (
                        <div key={song._id} className={cx('ranking-image-1')}>
                            <div className={cx('image')}>
                                <Image
                                    className={cx('image3')}
                                    src={song.thumbnailUrl}
                                    alt=""
                                    width={300}
                                    height={300}
                                />
                            </div>
                            <div className={cx('songsinger-main')}>
                                <div className={cx('songsinger-ranking')}>
                                    <span className={cx('song')}>{song.title}</span>
                                    {song.performers.map((user) => (
                                        <Link
                                            key={user._id}
                                            href={'/composer/@' + user.nickname}
                                            className={cx('singer')}
                                        >
                                            {user.name}
                                        </Link>
                                    ))}
                                </div>
                                <div className={cx('rankingdate-main')}>
                                    <div className={cx('ranking')}>
                                        <span>#{index + 1}</span>
                                    </div>
                                    <div className={cx('date')}>
                                        <span>{format(new Date(song.publish), 'dd/MM/yyyy')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {apiSongTopView.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
            <div className={cx('main-hot')}>
                <h3>Thể loại phổ biến nhất</h3>
                {apiGenreTop.isLoading && <SkeletonLoading count={3} />}
                <div className={cx('hot-image')}>
                    {apiGenreTop.data?.data.map((genre) => (
                        <Link href={'/genres/' + genre._id} key={genre._id} className={cx('hot-image-1')}>
                            <div className={cx('image-album')}>
                                {genre.thumbnailUrl && (
                                    <Image
                                        className={cx('image5')}
                                        src={'/images/genres/' + genre.thumbnailUrl}
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                )}
                                {genre.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                            </div>
                            <h2>{genre.title}</h2>
                        </Link>
                    ))}
                </div>
                {apiGenreTop.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>

            <div className={cx('main-hot')}>
                <h3>Hot Album</h3>
                {apiAlbumNewWeek.isLoading && <SkeletonLoading count={3} />}
                <div className={cx('hot-image')}>
                    {apiAlbumNewWeek.data?.data.map((item) => (
                        <Link href={'/user/album/' + item._id} key={item._id} className={cx('hot-image-1')}>
                            <div className={cx('image-album')}>
                                {item.thumbnailUrl && (
                                    <Image
                                        className={cx('image5')}
                                        src={item.thumbnailUrl}
                                        alt=""
                                        width={500}
                                        height={500}
                                    />
                                )}
                                {item.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                            </div>
                            <h2>{item.title}</h2>
                            <span>{item.userReference.name}</span>
                        </Link>
                    ))}
                </div>
                {apiAlbumNewWeek.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage;
