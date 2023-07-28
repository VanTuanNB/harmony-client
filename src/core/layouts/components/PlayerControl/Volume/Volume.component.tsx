'use client';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeDown, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import styles from './Volume.module.scss';
import { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { changeVolumeAction, selectSongReducer } from '@/core/redux/features/song/song.slice';

const cx = classNames.bind(styles);
function VolumeComponent() {
    const store = useAppSelector(selectSongReducer);
    const [processWidth, setProgressWidth] = useState<number>(store.playing.volume * 100);
    const volumeRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const handleOnMouseDown = () => {
        document.addEventListener('mousemove', handleOnMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
    };
    const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSetPercentProcessBar(event);
    };
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleOnMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
    };
    const handleClickSeekProcess = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSetPercentProcessBar(event);
    };

    const handleToggleChangeVolume = (event: React.MouseEvent<HTMLButtonElement>) => {
        setProgressWidth((prevState) => (prevState ? 0 : 100));
    };

    const handleSetPercentProcessBar = (event: React.MouseEvent<HTMLDivElement>) => {
        if (volumeRef.current) {
            const progressBarWidth = volumeRef.current.offsetWidth;
            const mouseX = event.clientX - volumeRef.current.getBoundingClientRect().left;
            const newProgressWidth = (mouseX / progressBarWidth) * 100;
            let formatProcessWidth = 0;
            if (newProgressWidth > 100) {
                formatProcessWidth = 100;
            } else if (newProgressWidth < 0) {
                formatProcessWidth = 0;
            } else {
                formatProcessWidth = Math.floor(newProgressWidth);
            }
            setProgressWidth(formatProcessWidth);
        }
    };

    const handleCalculatorPercentToValueVolume = (percentNumber: number) => {
        return Number((percentNumber / 100).toFixed(1));
    };

    useEffect(() => {
        const volumeValue = handleCalculatorPercentToValueVolume(processWidth);
        dispatch(changeVolumeAction(volumeValue));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [processWidth]);

    return (
        <div className={cx('volume-bar')}>
            <button className={cx('btn-toggle-volume')} onClick={handleToggleChangeVolume}>
                <FontAwesomeIcon icon={processWidth ? faVolumeDown : faVolumeMute} className={cx('icon')} />
            </button>
            <div
                ref={volumeRef}
                onMouseDown={handleOnMouseDown}
                onClick={handleClickSeekProcess}
                className={cx('progress-bar')}
            >
                <div style={{ width: `${processWidth}%` }} className={cx('progress-inner')}></div>
            </div>
        </div>
    );
}

export default memo(VolumeComponent);
