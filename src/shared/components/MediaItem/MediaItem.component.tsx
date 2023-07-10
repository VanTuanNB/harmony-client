import { ReactNode, memo, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './MediaItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import LoadingSong from '../Loading/LoadingSong/LoadingSong.component';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';

const cx = classNames.bind(styles);

interface IMediaItem extends Pick<ISong, '_id' | 'thumbnail' | 'title' | 'performers'> {
    active?: boolean;
    state?: EStateCurrentSong;
    onClick: (_id: string) => void;
}

function MediaItem({ _id, thumbnail, title, performers, active = false, onClick }: IMediaItem): ReactNode {
    const [favorite, setFavorite] = useState<boolean>(false);
    const store: ISongStore = useAppSelector(selectSongReducer);

    return (
        <div className={cx('wrapper-media', active && 'active')}>
            <div className={cx('media')} onClick={() => onClick(_id)}>
                <div className={cx('box-left')}>
                    <div className={cx('thumbnail')}>
                        <Image src={thumbnail} alt="fallback img" height={40} width={40} className={cx('img')} />
                        {store.playing.state === EStateCurrentSong.LOADING && store.playing.currentSong._id === _id && (
                            <div className={cx('loading-spinner')}>
                                <LoadingSong width={4} subHeight={8} primaryHeight={14} />
                            </div>
                        )}
                    </div>
                    <div className={cx('info')}>
                        <h1 className={cx('title')}>{title}</h1>
                        <h3 className={cx('performers')}>
                            {performers.map(
                                (performer: { _id: string; name: string; nickname: string }, index: number) => (
                                    <Link key={index} href={'/' + performer.nickname} className={cx('link-channel')}>
                                        {performer.name}
                                    </Link>
                                ),
                            )}
                        </h3>
                    </div>
        <div className={cx('media')}>
            <div className={cx('box-left')}>
                <div className={cx('thumbnail')}>
                    <Image src={thumbnail} alt="" height={40} width={40} className={cx('img')} />

                </div>
                <div className={cx('box-right')}>
                    <button
                        className={cx('btn', 'btn-switch-favorite')}
                        onClick={() => setFavorite((prevState) => !prevState)}
                    >
                        {favorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartRegular} />}
                    </button>
                    <button className={cx('btn', 'more-options')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default memo(MediaItem);