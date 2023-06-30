'use client';
import classNames from 'classnames/bind';
import styles from './Suggest.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import MediaItem from '../MediaItem/MediaItem.component';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { pushListSuggestSongIntoStore, selectSongReducer } from '@/core/redux/features/song/song.slice';
import { ISong } from '@/core/common/interfaces/collection.interface';
import SkeletonLoading from '../Loading/SkeletonLoading.component';
import { useGetServiceSongsQuery } from '@/core/redux/services/song.service';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SuggestComponent(): ReactNode {
    const { data, error, isLoading } = useGetServiceSongsQuery('');
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            dispatch(pushListSuggestSongIntoStore(data.data));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const store: ISongStore = useAppSelector(selectSongReducer);
    const dataSong = store.playlist.suggests;
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Gợi ý cho bạn</h2>
            <div className={cx('contents')}>
                {isLoading && <SkeletonLoading count={10} />}
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
    );
}

export default SuggestComponent;
