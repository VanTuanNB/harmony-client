'use client';
import classNames from 'classnames/bind';
import styles from './Suggest.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import MediaItem from '../MediaItem/MediaItem.component';
import { useAppSelector } from '@/core/redux/hook.redux';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { ISong } from '@/core/common/interfaces/collection.interface';
import SkeletonLoading from '../Loading/SkeletonLoading.component';
import { useGetServiceSongsQuery } from '@/core/redux/services/song.service';

const cx = classNames.bind(styles);

function SuggestComponent(): ReactNode {
    const store = useAppSelector(selectSongReducer);
    const { data, error, isLoading } = useGetServiceSongsQuery('');
    const [dataSong, setDataSong] = useState<ISong[]>([]);
    console.log(data);
    useEffect(() => {
        if (data) {
            setDataSong(data.data);
        }
    }, [data]);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Gợi ý cho bạn</h2>
            <div className={cx('contents')}>
                {isLoading || dataSong.length > 0 ? (
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
                ) : (
                    <SkeletonLoading count={10} />
                )}
            </div>
        </div>
    );
}

export default SuggestComponent;
