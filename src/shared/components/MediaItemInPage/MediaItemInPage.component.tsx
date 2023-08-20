import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { selectSongReducer, updateStatePlayingAction } from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import HeartComponent from '../Heart/Heart.component';
import styles from './MediaItemInPage.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    data: ISong;
    onClick: (data: ISong) => void;
}

function MediaItemInPage({ data, onClick }: IProps) {
    const dispatch = useAppDispatch();
    const { playing } = useAppSelector(selectSongReducer);
    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };
    return (
        <div
            onClick={() => onClick(data)}
            className={cx('wrapper-media', playing.currentSong._id === data._id && 'active')}
        >
            <div className={cx('media')}>
                <div className={cx('box-left')}>
                    <div className={cx('thumbnail')}>
                        <Image
                            src={data.thumbnailUrl}
                            alt="fallback img"
                            height={40}
                            width={40}
                            className={cx('img')}
                        />
                        {playing.currentSong._id === data._id && (
                            <>
                                {playing.state.includes(EStateCurrentSong.PLAYING) && (
                                    <div className={cx('playing-icon')}>
                                        <i className={cx('icon')}></i>
                                    </div>
                                )}
                                {playing.state.includes(EStateCurrentSong.PAUSED) && (
                                    <div className={cx('playing-icon')} onClick={handlePlaying}>
                                        <FontAwesomeIcon icon={faPlay} className={cx('icon-pause')} />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className={cx('info')}>
                        <h1 className={cx('title')}>{data.title}</h1>
                        <h3 className={cx('performers')}>
                            {data.performers.map((item, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={'/composer/@' + item.nickname}
                                        className={cx('link-channel')}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </h3>
                    </div>
                </div>
                <div className={cx('box-right')}>
                    <HeartComponent />
                </div>
            </div>
        </div>
    );
}

export default MediaItemInPage;
