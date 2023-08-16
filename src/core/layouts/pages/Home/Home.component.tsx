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
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function HomePage() {
    const justReleased = useGetServiceSongsJustReleasedQuery('3');
    const albumNewWeek = useGetServiceAlbumNewWeekQuery('2');
    const viewtop = useGetServiceSongsViewTopQuery('5');
    const [active, setActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (justReleased.data) {
            dispatch(pushListSuggestSongIntoStoreAction(justReleased.data.data));
        }
        if (viewtop.data) {
            dispatch(pushListSuggestSongIntoStoreAction(viewtop.data.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [justReleased.data, viewtop.data]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
    console.log(albumNewWeek.data);

    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
            </div>
            <div className={cx('main-just')}>
                <h3 className={cx('title')}>Bài hát vừa phát hành</h3>
                {justReleased.isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>
                    {justReleased.data?.data.map((song) => {
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
                {justReleased.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
                <h3 className={cx('title')}>Bài hát thịnh hành</h3>
                {viewtop.isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>
                    {viewtop.data?.data.map((song) => {
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
                {viewtop.error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
            <div className={cx('main-ranking')}>
                <div></div>
                <h3>Ranking</h3>
                {/* {isLoading && <SkeletonLoading count={3} />} */}
                <div className={cx('list-rank')}>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        </div>
                        <div className={cx('songsinger-main')}>
                            <div className={cx('songsinger-ranking')}>
                                <span className={cx('song')}>Anh da on hon</span>
                                <a href="#" className={cx('singer')}>
                                    MCK
                                </a>
                            </div>
                            <div className={cx('rankingdate-main')}>
                                <div className={cx('ranking')}>
                                    <span>#1</span>
                                </div>
                                <div className={cx('date')}>
                                    <span>20.10.2022</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        </div>
                        <div className={cx('songsinger-main')}>
                            <div className={cx('songsinger-ranking')}>
                                <span className={cx('song')}>Anh da on hon</span>
                                <a href="#" className={cx('singer')}>
                                    MCK
                                </a>
                            </div>
                            <div className={cx('rankingdate-main')}>
                                <div className={cx('ranking')}>
                                    <span>#1</span>
                                </div>
                                <div className={cx('date')}>
                                    <span>20.10.2022</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        </div>
                        <div className={cx('songsinger-main')}>
                            <div className={cx('songsinger-ranking')}>
                                <span className={cx('song')}>Anh da on hon</span>
                                <a href="#" className={cx('singer')}>
                                    MCK
                                </a>
                            </div>
                            <div className={cx('rankingdate-main')}>
                                <div className={cx('ranking')}>
                                    <span>#1</span>
                                </div>
                                <div className={cx('date')}>
                                    <span>20.10.2022</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )} */}
            </div>
            <div className={cx('main-top')}>
                <h3>Top 10</h3>
                {/* {isLoading && <SkeletonLoading count={3} />} */}
                <div className={cx('top-image')}>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                </div>
                {/* {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )} */}
            </div>

            <div className={cx('main-hot')}>
                <h3>Hot Album</h3>
                {albumNewWeek.isLoading && <SkeletonLoading count={3} />}
                <div className={cx('hot-image')}>
                    {albumNewWeek.data?.data.map((item) => (
                        <Link href={'/user/album/' + item._id} key={item._id} className={cx('hot-image-1')}>
                            <div className={cx('image-album')}>
                                {item.thumbnailUrl && (
                                    <Image
                                        className={cx('image5')}
                                        src={item.thumbnailUrl}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                )}
                                {item.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                            </div>
                            <h2>{item.title}</h2>
                            <span>{item.userReference.name}</span>
                        </Link>
                    ))}
                </div>
                {albumNewWeek.error && (
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
