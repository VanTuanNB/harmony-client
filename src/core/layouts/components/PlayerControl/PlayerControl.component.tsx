import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { selectSongReducer, updateStatePlayingAction } from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetStreamSongQuery } from '@/core/redux/services/song.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { faCompress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useCallback, useEffect } from 'react';
import AudioComponent from './Audio/Audio.component';
import ControlComponent from './Control/Control.component';
import styles from './PlayerControl.module.scss';
import VolumeComponent from './Volume/Volume.component';
const cx = classNames.bind(styles);

function PlayerControl() {
    const store = useAppSelector(selectSongReducer);
    const dispatch = useAppDispatch();
    const { data, isLoading, isSuccess } = useGetStreamSongQuery(store.playing.currentSong._id);

    useEffect(() => {
        if (isSuccess) {
            dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
        } else {
            dispatch(updateStatePlayingAction(EStateCurrentSong.FAILED));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, isSuccess]);

    const handleTogglePlaySong = useCallback(() => {
        if (!!isSuccess) {
            switch (store.playing.state) {
                case EStateCurrentSong.PLAYING:
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PAUSED));
                    break;
                default:
                    dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
                    break;
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.playing.state]);

    return (
        <div hidden={store.playing.state === EStateCurrentSong.FAILED} className={cx('player-control')}>
            <div className={cx('song-bar')}>
                <div className={cx('song-infors')}>
                    <div className={cx('image-container')}>
                        <Image
                            className={cx('image1')}
                            src={store.playing.currentSong.thumbnailUrl || '/'}
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
                    <HeartComponent />
                    <FontAwesomeIcon icon={faCompress} className={cx('icon')} />
                </div>
            </div>
            <div className={cx('progress-controller')}>
                <ControlComponent
                    isLoading={isLoading}
                    strategies={store.playing.strategies}
                    state={store.playing.state}
                    onTogglePlaying={handleTogglePlaySong}
                />
                <AudioComponent data={data || ''} store={store}></AudioComponent>
            </div>
            <div className={cx('other-features')}>
                <VolumeComponent />
            </div>
        </div>
    );
}

export default memo(PlayerControl);
