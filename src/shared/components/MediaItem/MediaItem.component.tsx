import classNames from 'classnames/bind';
import { ReactNode, memo, useState } from 'react';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { selectSongReducer } from '@/core/redux/features/song/song.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSong from '../Loading/LoadingSong/LoadingSong.component';
import styles from './MediaItem.module.scss';

const cx = classNames.bind(styles);

interface IMediaItem extends Pick<ISong, '_id' | 'thumbnailUrl' | 'title' | 'performers'> {
    active?: boolean;
    state?: EStateCurrentSong;
    onClick: (_id: string) => void;
}

function MediaItem({ _id, thumbnailUrl, title, performers, active = false, onClick }: IMediaItem): ReactNode {
    const [favorite, setFavorite] = useState<boolean>(false);
    const store: ISongStore = useAppSelector(selectSongReducer);

    return (
        <div className={cx('wrapper-media', active && 'active')}>
            <div className={cx('media')} onClick={() => onClick(_id)}>
                <div className={cx('box-left')}>
                    <div className={cx('thumbnail')}>
                        <Image src={thumbnailUrl} alt="fallback img" height={40} width={40} className={cx('img')} />
                        {store.playing.state === EStateCurrentSong.LOADING && store.playing.currentSong._id === _id && (
                            <div className={cx('loading-spinner')}>
                                <LoadingSong width={4} subHeight={8} primaryHeight={14} />
                            </div>
                        )}
                    </div>
                    <div className={cx('info')}>
                        <h1 className={cx('title')}>{title}</h1>
                        <h3 className={cx('performers')}>
                            {/* {performers.map((item, index) => {
                                return (
                                    <Link key={index} href={'/' + item.nickname} className={cx('link-channel')}>
                                        {item.name}
                                    </Link>
                                );
                            })} */}

                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(MediaItem);
