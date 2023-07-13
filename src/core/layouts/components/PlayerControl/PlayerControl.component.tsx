import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faBars,
    faCompress,
    faForwardStep,
    faMicrophoneLines,
    faPause,
    faPlay,
    faRetweet,
    faShuffle,
    faVolumeDown,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { selectSongReducer, updateStatePlayingAction } from '@/core/redux/features/song/song.slice';
import { useGetStreamSongQuery } from '@/core/redux/services/song.service';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import LoadingSpinner from '@/shared/components/Loading/LoadingSpinner/LoadingSpinner.component';
import ProcessBar from './ProcessBar/ProcessBar.component';
const cx = classNames.bind(styles);

function PlayerControl() {
    const store = useAppSelector(selectSongReducer);
    const dispatch = useAppDispatch();
    const [timeProcess, setTimeProcess] = useState<number>(0);
    const { data, error, isLoading } = useGetStreamSongQuery(store.playing.currentSong._id);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (data) {
            dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
        } else {
            dispatch(updateStatePlayingAction(EStateCurrentSong.FAILED));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, error]);

    const handleTogglePlaySong = () => {
        if (data) {
            switch (store.playing.state) {
                case EStateCurrentSong.PLAYING:
                    audioRef.current?.pause();
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PAUSED));
                    break;
                default:
                    audioRef.current?.play();
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
                    break;
            }
        }
    };

    const handleTakeSeekTime = useCallback((processPercent: number) => {
        console.log(`processPercent: `, processPercent);
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const seekTime = (processPercent / 100) * duration;
            if (!isNaN(seekTime) && isFinite(seekTime)) {
                audioRef.current.currentTime = seekTime;
            }
        }
    }, []);

    const handleOnPause = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PAUSED));
    };

    const handleOnPlay = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };

    useEffect(() => {
        if (audioRef.current) {
            const handleUpdateProgress = () => {
                const duration = audioRef.current!.duration;
                const currentTime = audioRef.current!.currentTime;
                const newProgressWidth = (currentTime / duration) * 100;
                setTimeProcess(newProgressWidth);
            };
            audioRef.current.addEventListener('timeupdate', handleUpdateProgress);
            return () => audioRef.current!.removeEventListener('timeupdate', handleUpdateProgress);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioRef.current]);

    return (
        <div hidden={store.playing.state === EStateCurrentSong.FAILED} className={cx('player-control')}>
            <div className={cx('song-bar')}>
                <div className={cx('song-infors')}>
                    <div className={cx('image-container')}>
                        <Image
                            className={cx('image1')}
                            src={store.playing.currentSong.thumbnail}
                            alt=""
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className={cx('song-description')}>
                        <p className={cx('title')}>{store.playing.currentSong.title || ''}</p>
                        <p className={cx('artist')}>
                            {(store.playing.currentSong.performers &&
                                store.playing.currentSong.performers.map((performer) => (
                                    <span key={performer._id}>{performer.name}</span>
                                ))) ||
                                ''}
                        </p>
                    </div>
                </div>
                <div className={cx('icons')}>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                    <FontAwesomeIcon icon={faCompress} className={cx('icon')} />
                </div>
            </div>
            <div className={cx('progress-controller')}>
                <div className={cx('control-buttons')}>
                    <FontAwesomeIcon icon={faShuffle} className={cx('icon')} />
                    <FontAwesomeIcon icon={faBackwardStep} className={cx('icon')} />
                    <button className={cx('btn-toggle-play-paused')} onClick={handleTogglePlaySong}>
                        {isLoading || store.playing.state === EStateCurrentSong.LOADING ? (
                            <LoadingSpinner width={20} height={20} />
                        ) : (
                            <>
                                {data && store.playing.state === EStateCurrentSong.PLAYING && (
                                    <FontAwesomeIcon icon={faPause} className={cx('icon-play-or-pause')} />
                                )}
                                {data && store.playing.state === EStateCurrentSong.PAUSED && (
                                    <FontAwesomeIcon icon={faPlay} className={cx('icon-play-or-pause')} />
                                )}
                            </>
                        )}
                    </button>
                    <FontAwesomeIcon icon={faForwardStep} className={cx('icon')} />
                    <FontAwesomeIcon icon={faRetweet} className={cx('icon')} />
                </div>
                <div className={cx('wrapper-media')}>
                    <audio
                        autoPlay
                        onPause={handleOnPause}
                        onPlay={handleOnPlay}
                        loop
                        ref={audioRef}
                        src={data || ''}
                    ></audio>
                </div>
                {/* thanh am nhac */}
                <div className={cx('progress-container')}>
                    <span>0:49</span>
                    <ProcessBar timeProcess={timeProcess} onDispatchSeekTime={handleTakeSeekTime} />
                    <span>3:15</span>
                </div>
            </div>
            <div className={cx('other-features')}>
                <FontAwesomeIcon icon={faMicrophoneLines} className={cx('icon')} />
                <FontAwesomeIcon icon={faBars} className={cx('icon')} />
                <div className={cx('volume-bar')}>
                    <FontAwesomeIcon icon={faVolumeDown} className={cx('icon')} />
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress-inner')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerControl;
