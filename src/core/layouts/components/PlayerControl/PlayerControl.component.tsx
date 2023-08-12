import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { selectSongReducer, updateStatePlayingAction } from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetStreamSongQuery } from '@/core/redux/services/song.service';
import LoadingSpinner from '@/shared/components/Loading/LoadingSpinner/LoadingSpinner.component';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faCompress,
    faForwardStep,
    faPause,
    faPlay,
    faRetweet,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect } from 'react';
import AudioComponent from './Audio/Audio.component';
import styles from './PlayerControl.module.scss';
import VolumeComponent from './Volume/Volume.component';
const cx = classNames.bind(styles);

function PlayerControl() {
    const store = useAppSelector(selectSongReducer);
    const dispatch = useAppDispatch();
    const { data, error, isLoading } = useGetStreamSongQuery(store.playing.currentSong._id);

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
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PAUSED));
                    break;
                default:
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
                    break;
            }
        }
    };

    return (
        <div hidden={store.playing.state === EStateCurrentSong.FAILED} className={cx('player-control')}>
            <div className={cx('song-bar')}>
                <div className={cx('song-infors')}>
                    <div className={cx('image-container')}>
                        <Image
                            className={cx('image1')}
                            src={store.playing.currentSong.thumbnail || '/'}
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
                <AudioComponent data={data || ''}></AudioComponent>
            </div>
            <div className={cx('other-features')}>
                <VolumeComponent />
            </div>
        </div>
    );
}

export default PlayerControl;
