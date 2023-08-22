'use client';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { IHistory, ISong, IUser } from '@/core/common/interfaces/collection.interface';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetHistoryByUserIdQuery } from '@/core/redux/services/history.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { formatDate } from '@/utils/format.util';
import { faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './History.module.scss';

const cx = classNames.bind(styles);

function HistoryPage() {
    const [histories, setHistories] = useState<IHistory>();
    const { data, isLoading } = useGetHistoryByUserIdQuery();
    const dispatch = useAppDispatch();
    const store = useAppSelector(selectSongReducer);
    useEffect(() => {
        if (data && data.success) {
            setHistories(data.data);
        }
    }, [data]);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (histories &&
                    histories.listSong &&
                    histories.listSong.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (histories &&
                histories.listSong &&
                histories.listSong.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };
    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };
    return (
        <div className={cx('main-album')}>
            <div className={cx('title')}>
                <h2>Danh sách bài hát đã nghe</h2>
                <p>Chỉ hiển thị với bạn</p>
            </div>
            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div className={cx('id')}>#</div>
                    <div className={cx('song')}>Bài hát</div>
                    <div className={cx('album')}>Album</div>
                    <div className={cx('date')}>Ngày phát hành</div>
                    <div className={cx('lenght')}>
                        <FontAwesomeIcon className={cx('icon-clock')} icon={faClock} />
                    </div>
                </div>
                <div className={cx('list-songs')}>
                    {histories &&
                        histories.listSong.length &&
                        histories.listSong.map((song: ISong, index: number) => (
                            <div
                                key={index}
                                className={cx('single-song', store.playing.currentSong._id === song._id && 'active')}
                            >
                                <div className={cx('id')}>{index + 1}</div>
                                <div className={cx('song')} onClick={() => onClick(song, index)}>
                                    <div className={cx('wrapper-img')}>
                                        <Image
                                            className={cx('img')}
                                            src={song.thumbnailUrl}
                                            width={40}
                                            height={40}
                                            alt=""
                                        />
                                        {store.playing.currentSong._id === song._id && (
                                            <>
                                                {store.playing.state.includes(EStateCurrentSong.PLAYING) && (
                                                    <div className={cx('playing-icon')}>
                                                        <i className={cx('icon')}></i>
                                                    </div>
                                                )}
                                                {store.playing.state.includes(EStateCurrentSong.PAUSED) && (
                                                    <div className={cx('playing-icon')} onClick={handlePlaying}>
                                                        <FontAwesomeIcon icon={faPlay} className={cx('icon-pause')} />
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div className={cx('song-title')}>
                                        <div className={cx('song-name')}>{song.title}</div>
                                        <div className={cx('author')}>
                                            {song.performers.map((performer: IUser) => performer.name)}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('album')}>
                                    <Tippy
                                        interactive
                                        content={
                                            <ul className={cx('list-tooltip')}>
                                                {song.albumReference?.map((album, index) => (
                                                    <li key={index}>
                                                        <Link href={'/user/album/' + album._id} key={index}>
                                                            {album.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    >
                                        <div>
                                            {!!song.albumReference?.length ? (
                                                song.albumReference?.map((album, index) => (
                                                    <Link href={'/user/album/' + album._id} key={index}>
                                                        {album.title}
                                                    </Link>
                                                ))
                                            ) : (
                                                <span style={{ width: '164px', display: 'block', textAlign: 'center' }}>
                                                    -
                                                </span>
                                            )}
                                        </div>
                                    </Tippy>
                                </div>

                                <div className={cx('date')}>{formatDate(song.publish)}</div>
                                <div className={cx('lenght')}>
                                    <HeartComponent />
                                    <span className={cx('lenght')}>3:40</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default HistoryPage;
