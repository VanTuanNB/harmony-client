import { IPlaylist } from '@/core/common/interfaces/collection.interface';
import { selectUserReducer } from '@/core/redux/features/user/user.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import { PlayListIcon } from '@/shared/components/Svg/index.component';
import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './PlaylistSymlink.module.scss';

const cx = classNames.bind(styles);

export default function PlaylistSymlinkComponent() {
    const store = useAppSelector(selectUserReducer);
    const [playlist, setPlayList] = useState<IPlaylist[]>([]);
    const { data } = useGetServiceProfileQuery(store.profile?._id || '');
    useEffect(() => {
        if (data) {
            setPlayList(data.data.playlistReference ?? []);
        }
    }, [data]);
    return (
        <div className={cx('right-slide')}>
            <div className={cx('main-container')}>
                <div className={cx('main-header')}>
                    <div className={cx('header-menu')}>
                        <a href="#" className={cx('main-header-link')}>
                            Playlists
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx('search-sidebar')}>
                <div className={cx('container')}>
                    <input placeholder="Type to search..." className={cx('input')} name="text" type="text" />
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                </div>
                <FontAwesomeIcon icon={faPlus} className={cx('icon1')} />
            </div>
            <div className={cx('album-render')}>
                <div className={cx('list-songs')}>
                    {data &&
                        playlist?.map((item) => (
                            <div key={item._id} className={cx('single-song')}>
                                <div id={cx('song')}>
                                    <Image src={'/images/playlist.png'} alt={''} width={40} height={40} />
                                    <div id={cx('song-title')}>
                                        <div id={cx('title')}>{item.title}</div>
                                        <div id={cx('author')}>{data.data.name}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    {playlist?.length === 0 && (
                        <div className={cx('albumNot')}>
                            <PlayListIcon className={cx('icon-album')} />
                            <h2>Bạn chưa có playlist</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
