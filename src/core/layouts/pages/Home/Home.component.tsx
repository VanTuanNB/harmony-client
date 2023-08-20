'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import {
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    selectSongReducer,
    shiftListNextSong,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import Image from 'next/image';
import { memo, useCallback, useState } from 'react';
import styles from './Home.module.scss';
import AlbumHotComponent from './Hot/AlbumHot.component';
import GenreHotComponent from './Hot/GenreHot.component';
import RankingComponent from './Ranking/Ranking.component';
import ReleaseComponent from './Release/Release.component';
const cx = classNames.bind(styles);

const images = [
    '/images/thumnail1.jpg',
    '/images/thumnail2.jpg',
    '/images/thumnail3.jpg',
    '/images/thumnail4.jpg',
    '/images/thumnail1.jpg',
    '/images/thumnail2.jpg',
];

function HomePage() {
    const [startImageIndex, setStartImageIndex] = useState(0);
    const imagesToShow = images.slice(startImageIndex, startImageIndex + 3);
    const dispatch = useAppDispatch();
    const store = useAppSelector(selectSongReducer);
    const showNextImages = () => {
        setStartImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 3));
    };
    const showPreviousImages = () => {
        setStartImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    const onClick = useCallback(
        (data: ISong) => {
            if (!!store.playing.currentSong && store.playing.currentSong._id !== data._id) {
                if (!!store.playlist.prevSongs.length) {
                    dispatch(pushSongIntoPrevPlayListAction(data));
                }
                dispatch(shiftListNextSong(data._id));
                dispatch(removeSongFromSuggestListAction(data._id));
                dispatch(startPlayingAction(data));
            }
        },
        [dispatch, store],
    );
    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <button className={cx('icon-slideright')} onClick={showPreviousImages}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>

                {imagesToShow.map((image, index) => (
                    <Image key={index} className={cx('image2')} src={image} width={1000} height={1000} alt="" />
                ))}
                <button className={cx('icon-slideleft')} onClick={showNextImages}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <ReleaseComponent onClick={onClick} />
            <RankingComponent onClick={onClick} />
            <GenreHotComponent />
            <AlbumHotComponent />
        </div>
    );
}

export default memo(HomePage);
