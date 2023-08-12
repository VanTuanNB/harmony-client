'use client';
import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './LibraryProfile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function PlaylistProfileComponent() {
    return (
        <div className={cx('result-render')}>
            <div className={cx('single-album')}>
                <div className={cx('mask')}></div>
                <div className={cx('image')}>
                    <Image src="" width={100} height={100} alt="" />
                    <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                </div>
                <div className={cx('title')}>
                    <div id={cx('title')}>Starboy</div>
                    <div id={cx('origin')}>2020 • The Weeknd</div>
                </div>
            </div>
        </div>
    );
}

export default PlaylistProfileComponent;
