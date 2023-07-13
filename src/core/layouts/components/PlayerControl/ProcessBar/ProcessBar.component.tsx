'use client';
import classNames from 'classnames/bind';

import styles from './ProcessBar.module.scss';
import React, { memo, useEffect, useRef, useState } from 'react';

const cx = classNames.bind(styles);

interface IProcessBarProps {
    onDispatchSeekTime: (percentProcess: number) => void;
    timeProcess: number;
}

function ProcessBar({ timeProcess, onDispatchSeekTime }: IProcessBarProps) {
    const [progressWidth, setProgressWidth] = useState(0);
    const processRef = useRef<HTMLDivElement>(null);
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
        onDispatchSeekTime(progressWidth);
    };

    const handleClickSeekProcess = (event: React.MouseEvent<HTMLDivElement>) => {
        handleSetPercentProcessBar(event);
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
            setProgressWidth(formatProcessWidth);
        }
    };

    useEffect(() => {
        setProgressWidth(timeProcess);
    }, [timeProcess]);

    return (
        <div
            ref={processRef}
            draggable={false}
            onMouseDown={handleOnMouseDown}
            onClick={handleClickSeekProcess}
            className={cx('progress-bar')}
        >
            <div style={{ width: `${progressWidth}%` }} className={cx('progress')}></div>
        </div>
    );
}

export default memo(ProcessBar);
