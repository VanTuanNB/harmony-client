'use client';
import { ReactNode } from 'react';

import { ISong } from '@/core/common/interfaces/collection.interface';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import classNames from 'classnames/bind';
import MediaItem from '../MediaItem/MediaItem.component';
import styles from './Playlist.module.scss';

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
                                        thumbnailUrl={song.thumbnailUrl}
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
