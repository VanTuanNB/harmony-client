'use client';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { useEffect } from 'react';
import { useGetServiceSongsQuery } from '@/core/redux/services/song.service';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { pushListSuggestSongIntoStore, selectSongReducer } from '@/core/redux/features/song/song.slice';
import SkeletonLoading from '@/shared/components/Loading/SkeletonLoading.component';
import { faClock, faEllipsis, faHeart, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchFilterComponent from '@/shared/components/SearchFilter/SearchFilter.component';
import Image from 'next/image';

const cx = classNames.bind(styles);

function SearchPageAlbums() {
    return (
        <div className={cx('search-albums')}>
            <SearchFilterComponent/>
            <div className={cx('result-render')}>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
                <div className={cx('single-album')}>
                    <div className={cx('mask')}>
                        
                    </div>
                    <div className={cx('image')}>
                        <img src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" width={'168px'}/>
                        <Image
                            width={40}
                            height={40}
                            className={cx('playButton')}
                            src={'/images/playButton.png'}
                            alt=""
                        />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>Starboy</div>
                        <div id={cx('origin')}>
                            2020 • The Weeknd
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
export default SearchPageAlbums;
