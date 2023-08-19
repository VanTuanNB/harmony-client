'use client';
import { ReactNode } from 'react';

import { ISong } from '@/core/common/interfaces/collection.interface';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import classNames from 'classnames/bind';
import MediaItem from '../MediaItem/MediaItem.component';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function PlayingComponent(): ReactNode {
    const store = useAppSelector(selectSongReducer);
    const playing: ISong = store.playing.currentSong;
    const checkPlaying = Object.keys(playing);

    function handleClickMediaItem(_id: string) {}
    return (
        <div className={cx('prev-wrapper')}>
            {checkPlaying.length > 0 && (
                <>
                    <h2 className={cx('title')}>Bài hát đang phát</h2>
                    <ul className={cx('list-listening')}>
                        <li key={playing._id} className={cx('item')}>
                            <MediaItem
                                active={store.playing.currentSong && store.playing.currentSong._id === playing._id}
                                _id={playing._id}
                                title={playing.title}
                                thumbnailUrl={playing.thumbnailUrl}
                                performers={playing.performers}
                                onClick={handleClickMediaItem}
                            />
                        </li>
                    </ul>
                </>
            )}
        </div>
    );
}

export default PlayingComponent;
