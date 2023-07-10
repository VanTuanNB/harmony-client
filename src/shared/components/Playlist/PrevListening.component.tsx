'use client';
import { ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import MediaItem from '../MediaItem/MediaItem.component';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { useAppSelector } from '@/core/redux/hook.redux';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';

const cx = classNames.bind(styles);

interface IPrevListeningProps {
    data: ISong[];
}

function PrevListeningComponent(): ReactNode {
    const store = useAppSelector(selectSongReducer);
    const listSong: ISong[] = store.playlist.prevSongs ?? [];

    function handleClickMediaItem(_id: string) {}
    return (
        <div className={cx('prev-wrapper')}>
            {listSong.length > 0 && (
                <>
                    <h2 className={cx('title')}>Danh sách phát</h2>
                    <ul className={cx('list-listening')}>
                        {listSong.map((song) => {
                            return (
                                <li key={song._id} className={cx('item')}>
                                    <MediaItem
                                        active={store.playing.currentSong && store.playing.currentSong._id === song._id}
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
                </>
            )}
        </div>
    );
}

export default PrevListeningComponent;
