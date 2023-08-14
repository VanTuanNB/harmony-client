'use client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Home.module.scss';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';
import { useGetServiceSongsJustReleasedQuery, useGetServiceSongsViewTopQuery } from '@/core/redux/services/song.service';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useCallback, useEffect } from 'react';
import {
    pushListSuggestSongIntoStoreAction,
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { ISong } from '@/core/common/interfaces/collection.interface';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);


function HomePage() {
    const { data, error, isLoading } = useGetServiceSongsJustReleasedQuery('');
    const viewtop = useGetServiceSongsViewTopQuery('');

    console.log('view:',viewtop);
    
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(pushListSuggestSongIntoStoreAction(data.data));
        }
        // if(viewTopData){
        //     dispatch(pushListSuggestSongIntoStoreAction(viewTopData.data));
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const handleClickMediaItem = useCallback(
        (_id: string) => {
            const songSelected = store.playlist.suggests.find((song) => song._id === _id);
            dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
            dispatch(startPlayingAction(songSelected as ISong));
        },
        [dispatch, store.playlist.suggests],
    );
    const dataSong = store.playlist.suggests;
    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
                <Image className={cx('image2')} src="/images/img1.jpg" width={1} height={0.6} alt="" />
            </div>
            <div className={cx('main-just')}>
                <h3 className={cx('title')}>Just Released</h3>
                {isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>

                    {dataSong.map((song) => {

                        return (
                            <li key={song._id} className={cx('item')}>
                                <MediaItem
                                    _id={song._id}
                                    title={song.title}
                                    thumbnail={song.thumbnail}
                                    performers={song.performers}
                                    onClick={handleClickMediaItem}
                                />
                            </li>
                        );
                    })} 
                </ul>
                {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
                <h3 className={cx('title')}>Trending</h3>
                {isLoading && <SkeletonLoading count={3} />}
                <ul className={cx('list-listening')}>

                    {dataSong.map((song) => {

                        return (
                            <li key={song._id} className={cx('item')}>
                                <MediaItem
                                    _id={song._id}
                                    title={song.title}
                                    thumbnail={song.thumbnail}
                                    performers={song.performers}
                                    onClick={handleClickMediaItem}
                                />
                            </li>
                        );
                    })} 
                </ul>
                {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
            <div className={cx('main-ranking')}>
                <div></div>
                <h3>Ranking</h3>
                {isLoading && <SkeletonLoading count={3} />}
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
                {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
            <div className={cx('main-top')}>
                <h3>Top 100</h3>
                {isLoading && <SkeletonLoading count={3} />}
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
                {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>

            <div className={cx('main-hot')}>
                <h3>Hot Album</h3>
                {isLoading && <SkeletonLoading count={3} />}
                <div className={cx('hot-image')}>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                </div>
                {error && (
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
