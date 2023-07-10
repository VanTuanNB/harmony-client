import { ReactNode, useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import MediaItem from '../MediaItem/MediaItem.component';
import { useAppSelector } from '@/core/redux/hook.redux';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { ISong } from '@/core/common/interfaces/collection.interface';

const cx = classNames.bind(styles);

function NextListeningComponent(): ReactNode {
    const store = useAppSelector(selectSongReducer);
    const [data, setData] = useState<ISong[]>([]);
    // useEffect(() => {}, []);

    function handleClickMediaItem(_id: string) {}
    return (
        <div className={cx('next-wrapper')}>
            {data.length > 0 && (
                <>
                    <h2 className={cx('title')}>Tiếp theo</h2>
                    <ul className={cx('list-listening')}>
                        {data.map((song: ISong) => {
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
                </>
            )}
        </div>
    );
}

export default NextListeningComponent;
