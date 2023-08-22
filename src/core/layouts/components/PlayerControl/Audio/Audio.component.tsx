import { EStateCurrentSong, EStrategiesPlaying } from '@/core/common/constants/common.constant';
import {
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    shiftListNextSong,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import { usePostIncreaseConcurrencyViewSongMutation } from '@/core/redux/services/song.service';
import { formatDurationSong } from '@/utils/format.util';
import classNames from 'classnames/bind';
import ProcessBar from '../ProcessBar/ProcessBar.component';
import styles from './Audio.module.scss';

const cx = classNames.bind(styles);

interface IAudioProps {
    data: string;
    store: ISongStore;
}

function AudioComponent({ data, store }: IAudioProps) {
    const [timeProcess, setTimeProcess] = useState(0);
    const [totalDuration, setTotalDuration] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isLooping, setIsLooping] = useState<boolean>(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useAppDispatch();
    const [queueConcurrencyViewApi] = usePostIncreaseConcurrencyViewSongMutation();
    const handleOnPause = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PAUSED));
    };

    const handleOnPlay = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };

    const handleTakeSeekTime = useCallback((processPercent: number) => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const seekTime = (processPercent / 100) * duration;
            if (!isNaN(seekTime) && isFinite(seekTime)) {
                setTimeProcess(() => {
                    audioRef.current!.currentTime = seekTime;
                    return processPercent;
                });
            }
        }
    }, []);

    const onTimeUpdateProcess = useCallback((): number => {
        let animationFrameId: number = 0;
        if (audioRef.current) {
            const handleUpdateProgress = () => {
                const duration = audioRef.current ? audioRef.current.duration : 0;
                const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
                const newProgressWidth = (currentTime / duration) * 100;
                setTimeProcess(newProgressWidth);
                setCurrentTime(formatDurationSong(currentTime));
                animationFrameId = requestAnimationFrame(handleUpdateProgress);
            };
            animationFrameId = requestAnimationFrame(handleUpdateProgress);
        }
        return animationFrameId;
    }, []);

    useEffect(() => {
        const animationFrameId = onTimeUpdateProcess();
        return () => cancelAnimationFrame(animationFrameId);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioRef.current]);

    useEffect(() => {
        if (store.playing.state === EStateCurrentSong.PLAYING) {
            audioRef.current?.play();
            return;
        }
        if (store.playing.state === EStateCurrentSong.PAUSED) {
            audioRef.current?.pause();
            return;
        }
    }, [store.playing.state]);

    useEffect(() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            setTotalDuration(formatDurationSong(audioRef.current.duration));
        }
    }, [audioRef.current?.duration]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = store.playing.volume;
    }, [store.playing.volume]);

    const handleEndedEventAudio = () => {
        if (!store.playing.currentSong) return;
        switch (store.playing.strategies) {
            case EStrategiesPlaying.SEQUENTIALLY:
                queueConcurrencyViewApi(store.playing.currentSong._id);
                dispatch(pushSongIntoPrevPlayListAction(store.playing.currentSong));
                if (!!store.playlist.nextSongs.length) {
                    dispatch(removeSongFromSuggestListAction(store.playlist.nextSongs[0]._id));
                    dispatch(shiftListNextSong(store.playlist.nextSongs[0]._id));
                    dispatch(startPlayingAction(store.playlist.nextSongs[0]));
                } else {
                    dispatch(removeSongFromSuggestListAction(store.playlist.suggests[0]._id));
                    dispatch(startPlayingAction(store.playlist.suggests[0]));
                }
                break;
            case EStrategiesPlaying.RANDOM:
                break;
            default:
                if (!isLooping) {
                    queueConcurrencyViewApi(store.playing.currentSong._id);
                    setIsLooping(true);
                }
                if (audioRef.current) audioRef.current.play();
                break;
        }
    };

    return (
        <div className={cx('wrapper-media')}>
            <audio
                autoPlay
                onPause={handleOnPause}
                onPlay={handleOnPlay}
                ref={audioRef}
                src={data || ''}
                onEnded={handleEndedEventAudio}
            ></audio>
            <ProcessBar
                timeProcess={timeProcess}
                onDispatchSeekTime={handleTakeSeekTime}
                totalDuration={totalDuration}
                currentDurationTime={currentTime}
            />
        </div>
    );
}

export default memo(AudioComponent);
