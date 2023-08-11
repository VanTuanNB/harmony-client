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
import { faClock, faEllipsis, faHeart, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchFilterComponent from '@/shared/components/SearchFilter/SearchFilter.component';

const cx = classNames.bind(styles);

function SearchPageSongs() {
    return (
        <div className={cx('search-songs')}>
            <SearchFilterComponent />
            <div className={cx('result-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </div>
                <div className={cx('list-songs')}>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            /> */}
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>2</div>
                        <div id={cx('song')}>
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            /> */}
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>...</div>
                        <div id={cx('song')}>
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            /> */}
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>10</div>
                        <div id={cx('song')}>
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            /> */}
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>11</div>
                        <div id={cx('song')}>
                            {/* <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            /> */}
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchPageSongs;
