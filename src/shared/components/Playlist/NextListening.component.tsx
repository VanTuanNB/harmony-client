import { ReactNode } from 'react';

import { ISong } from '@/core/common/interfaces/collection.interface';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import classNames from 'classnames/bind';
import MediaItem from '../MediaItem/MediaItem.component';
import styles from './Playlist.module.scss';

const cx = classNames.bind(styles);

function NextListeningComponent(): ReactNode {
    const store = useAppSelector(selectSongReducer);

    function handleClickMediaItem(_id: string) {}
    return (
        <div className={cx('next-wrapper')}>
            {store.playlist.nextSongs.length > 0 && (
                <>
                    <h2 className={cx('title')}>Tiếp theo</h2>
                    <ul className={cx('list-listening')}>
                        {store.playlist.nextSongs.map((song: ISong) => {
                            return (
                                <li key={song._id} className={cx('item')}>
                                    <MediaItem
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

export default NextListeningComponent;
