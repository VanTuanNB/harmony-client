'use client';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { useEffect } from 'react';
import { useGetServiceSongsQuery } from '@/core/redux/services/song.service';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { pushListSuggestSongIntoStoreAction, selectSongReducer } from '@/core/redux/features/song/song.slice';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import SearchFilterComponent from '@/shared/components/SearchFilter/SearchFilter.component';


const cx = classNames.bind(styles);

function SearchPage() {
    const { data, error, isLoading } = useGetServiceSongsQuery('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(pushListSuggestSongIntoStoreAction(data.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const dataSong = store.playlist.suggests;
    return (
        <div className={cx('search')}>
            <SearchFilterComponent />
            <div className={cx('top-result')}>
                <div className={cx('result-left')}>
                    <h2>Top result</h2>
                    <div className={cx('left')}>
                        <Image
                            src=""
                            alt=""
                            width={100}
                            height={100}
                            className={cx('img')}
                        />
                        <div className={cx('top-result-infor')}>
                            <h3>Phiêu bồng</h3>
                            <p>Composer</p>
                        </div>
                    </div>
                </div>
                <div className={cx('result-right')}>
                    <h2>Related songs</h2>
                    <div className={cx('right')}>
                        {isLoading && <SkeletonLoading count={2} />}
                        {dataSong.length > 0 && (
                            <ul className={cx('list-listening')}>
                                {dataSong.map((song) => {
                                    return (
                                        <li key={song._id} className={cx('item')}>
                                            <MediaItem
                                                _id={song._id}
                                                title={song.title}
                                                thumbnail={song.thumbnail}
                                                performers={song.performers}
                                                onClick={() => {}}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                        {error && (
                            <div className={cx('wrapper-disconnect-network')}>
                                <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                                <span className={cx('disconnect-network-title')}>Bạn đã mất kết nối internet...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={cx('artist-result')}>
                <h2>Related Artist</h2>
                <div className={cx('item-artist')}>
                    <div className={cx('item')}>
                        <Image src="" alt="" width={100} height={100} className={cx('img')} />
                        <h3>Tuan Cao</h3>
                        <p>Artist</p>
                    </div>
                    <div className={cx('item')}>
                        <Image
                            src=""
                            alt=""
                            width={100} height={100}
                            className={cx('img')}
                        />
                        <h3>Huy Nguyen</h3>
                        <p>Artist</p>
                    </div>
                    <div className={cx('item')}>
                        <Image src="" alt="" width={100} height={100} className={cx('img')} />
                        <h3>Tuan Cao</h3>
                        <p>Artist</p>
                    </div>
                    <div className={cx('item')}>
                        <Image
                            src=""
                            alt=""
                            width={100} height={100}
                            className={cx('img')}
                        />
                        <h3>Huy Nguyen</h3>
                        <p>Artist</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchPage;
