import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { updateStatePlayingAction } from '@/core/redux/features/song/song.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { formatDurationSong } from '@/utils/format.util';
import classNames from 'classnames/bind';
import ProcessBar from '../ProcessBar/ProcessBar.component';
import styles from './Audio.module.scss';

const cx = classNames.bind(styles);

interface IAudioProps {
    data: string;
    state: EStateCurrentSong;
    volume: number;
}

function AudioComponent({ data, state, volume }: IAudioProps) {
    const [timeProcess, setTimeProcess] = useState(0);
    const [totalDuration, setTotalDuration] = useState<string>('');
    const [currentTime, setCurrentTime] = useState<string>('');
    const audioRef = useRef<HTMLAudioElement>(null);
    const dispatch = useAppDispatch();
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
        if (state === EStateCurrentSong.PLAYING) {
            audioRef.current?.play();
            return;
        }
        if (state === EStateCurrentSong.PAUSED) {
            audioRef.current?.pause();
            return;
        }
    }, [state]);

    useEffect(() => {
        if (audioRef.current && !isNaN(audioRef.current.duration)) {
            setTotalDuration(formatDurationSong(audioRef.current.duration));
        }
    }, [audioRef.current?.duration]);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    return (
        <div className={cx('wrapper-media')}>
            <audio autoPlay onPause={handleOnPause} onPlay={handleOnPlay} loop ref={audioRef} src={data || ''}></audio>
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
