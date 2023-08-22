'use client';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import UpdateSongComponent from '@/core/layouts/components/PopUp/UpdateSong/UpdateSong.component';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { formatDate } from '@/utils/format.util';
import { faEdit, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import 'tippy.js/dist/tippy.css';
import style from './SongComposer.module.scss';

const cx = classNames.bind(style);

function SongComposerPage() {
    const { slug } = useParams();
    const { data, isLoading, refetch } = useGetServiceProfileQuery(slug);
    const [popupUploadSong, setPopupUploadSong] = useState(false);
    const [editingSongId, setEditingSongId] = useState<string | null>();
    const dispatch = useAppDispatch();
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (data &&
                    data.data.songsReference &&
                    data.data.songsReference.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (data &&
                data.data.songsReference &&
                data.data.songsReference.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };
    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };

    const handUpdateSong = useCallback((isUpdated: boolean) => {
        if (isUpdated) {
            window.location.reload();
            setPopupUploadSong(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={cx('main-album')}>
            {isLoading && <SkeletonLoading count={20} />}
            <div className={cx('title')}>
                <h2>Danh sách bài hát của bạn</h2>
                <p>Chỉ hiện thị với bạn</p>
            </div>
            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div className={cx('id')}>#</div>
                    <div className={cx('song')}>Bài hát</div>
                    <div className={cx('album')}>Album</div>
                    <div className={cx('date')}>Ngày phát hành</div>
                </div>
                <div className={cx('list-songs')}>
                    {data &&
                        data.data.songsReference?.map((song, index) => (
                            <div
                                key={index}
                                className={cx('single-song', store.playing.currentSong._id === song._id && 'active')}
                            >
                                <div className={cx('id')}>{index + 1}</div>
                                <div className={cx('song')} onClick={() => onClick(song, index)}>
                                    <div className={cx('wrapper-img')}>
                                        <Image
                                            className={cx('img')}
                                            src={
                                                song && song.thumbnailUrl
                                                    ? `${song.thumbnailUrl}?${new Date().getTime()}`
                                                    : '/images/fallback-thumbnail-user.jpg'
                                            }
                                            width={500}
                                            height={500}
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
                                        <div className={cx('author')}>{data?.data.name}</div>
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
                                <div
                                    onClick={() => {
                                        setEditingSongId(song._id);
                                        setPopupUploadSong(true);
                                    }}
                                    className={cx('lenght')}
                                >
                                    <FontAwesomeIcon className={cx('icon')} icon={faEdit} />
                                </div>

                                {popupUploadSong && editingSongId === song._id && (
                                    <UpdateSongComponent
                                        dataProfile={data.data}
                                        songItem={song}
                                        isUpdated={handUpdateSong}
                                    />
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default memo(SongComposerPage);
