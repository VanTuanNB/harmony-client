'use client';
import classNames from 'classnames/bind';

import styles from './ProcessBar.module.scss';
import React, { memo, useEffect, useRef, useState } from 'react';
import { EDurationSong } from '@/shared/constants/common.constant';

const cx = classNames.bind(styles);

interface IProcessBarProps {
    onDispatchSeekTime: (percentProcess: number) => void;
    timeProcess: number;
    totalDuration: string;
    currentDurationTime: string;
}

function ProcessBar({ timeProcess, onDispatchSeekTime, currentDurationTime, totalDuration }: IProcessBarProps) {
    const [progressWidth, setProgressWidth] = useState<number>(0);
    const [isSeeking, setIsSeeking] = useState<boolean>(false);
    const processRef = useRef<HTMLDivElement>(null);
    const processValueChangeRef = useRef<number>(0);
    const handleOnMouseDown = () => {
        document.addEventListener('mousemove', handleOnMouseMove as any);
        document.addEventListener('mouseup', handleMouseUp);
        setIsSeeking(true);
    };
    const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSetPercentProcessBar(event);
    };
    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleOnMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
        onDispatchSeekTime(processValueChangeRef.current);
        setIsSeeking(false);
    };

    const handleClickSeekProcess = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSetPercentProcessBar(event);
        onDispatchSeekTime(processValueChangeRef.current);
    };
    const handleSetPercentProcessBar = (event: React.MouseEvent<HTMLDivElement>) => {
        if (processRef.current) {
            const progressBarWidth = processRef.current.offsetWidth;
            const mouseX = event.clientX - processRef.current.getBoundingClientRect().left;
            const newProgressWidth = (mouseX / progressBarWidth) * 100;
            let formatProcessWidth = 0;
            if (newProgressWidth > 100) {
                formatProcessWidth = 100;
            } else if (newProgressWidth < 0) {
                formatProcessWidth = 0;
            } else {
                formatProcessWidth = Math.floor(newProgressWidth);
            }
            processValueChangeRef.current = formatProcessWidth;
            setProgressWidth(formatProcessWidth);
        }
    };

    useEffect(() => {
        if (!isSeeking) setProgressWidth(timeProcess);
    }, [timeProcess, isSeeking]);

    return (
        <div className={cx('progress-container')}>
            <span>{currentDurationTime || EDurationSong.DEFAULT}</span>
            <div
                ref={processRef}
                draggable={false}
                onMouseDown={handleOnMouseDown}
                onClick={handleClickSeekProcess}
                className={cx('progress-bar')}
            >
                <div style={{ width: `${progressWidth}%` }} className={cx('progress')}></div>
            </div>
            <span>{totalDuration || EDurationSong.DEFAULT}</span>
        </div>
    );
}

export default memo(ProcessBar);
