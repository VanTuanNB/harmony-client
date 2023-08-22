'use client';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { IAlbum, ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceAlbumQuery } from '@/core/redux/services/album.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { ListSongIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import style from './AlbumUser.module.scss';
import PlayingAlbumComponent from './PlayAlbum.component';

const cx = classNames.bind(style);

function AlbumUserPage() {
    const [album, setAlbum] = useState<IAlbum>();
    const [listSong, setListSong] = useState<ISong[]>();
    const path = usePathname();
    const resurt = path.split('/album/')[1];
    const { data, isLoading, isError } = useGetServiceAlbumQuery(resurt);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            const song = data.data.listSong as ISong[];
            setAlbum(data.data);
            setListSong(song);
        }
    }, [data, listSong]);

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (data && data.data.listSong.filter((item: ISong, itemIndex: number) => itemIndex < index)) || [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (data && data.data.listSong.filter((item: ISong, itemIndex: number) => itemIndex > index)) || [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };

    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };

    return (
        <div className={cx('main-album')}>
            {isLoading && <SkeletonLoading count={10} />}
            {data?.status && (
                <>
                    <div className={cx('album-infor')}>
                        <div className={cx('image')}>
                            <Image
                                className={cx('album-img')}
                                src={album?.thumbnailUrl || '/images/playlist.png'}
                                width={232}
                                height={232}
                                alt=""
                            />
                        </div>
                        <div className={cx('album-detail')}>
                            <div className={cx('title')}>
                                <p>Album</p>
                                <span className={cx('album-name')}>{album?.title}</span>
                            </div>
                            <div className={cx('detail')}>
                                <Image
                                    className={cx('detail-image')}
                                    src={album?.userReference.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    width={24}
                                    height={24}
                                    alt=""
                                />
                                <div className={cx('infor')}>
                                    <span>
                                        <b>{album?.userReference.name}</b>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {data && data.data && !!data.data.listSong.length && (
                        <PlayingAlbumComponent data={data.data.listSong} />
                    )}
                    <div className={cx('album-render')}>
                        <div className={cx('title')}>
                            <div id={cx('id')}>#</div>
                            <div id={cx('song')}>Bài hát</div>
                            <div id={cx('album')}>Album</div>
                            <div id={cx('date')}>Ngày phát hành</div>
                        </div>
                        <div className={cx('list-songs')}>
                            {listSong?.map((song, index) => (
                                <div
                                    key={index}
                                    className={cx(
                                        'single-song',
                                        store.playing.currentSong._id === song._id && 'active',
                                    )}
                                >
                                    <div id={cx('id')}>{index + 1}</div>
                                    <div id={cx('song')} onClick={() => onClick(song, index)}>
                                        <div className={cx('wrapper-img')}>
                                            <Image
                                                className={cx('img')}
                                                src={song.thumbnailUrl}
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
                                                            <FontAwesomeIcon
                                                                icon={faPlay}
                                                                className={cx('icon-pause')}
                                                            />
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>{song.title}</div>
                                            <div id={cx('author')}>{data?.data.userReference.name}</div>
                                        </div>
                                    </div>
                                    <div id={cx('album')}>{data?.data.title}</div>
                                    <div id={cx('date')}>{formatDate(song.publish)}</div>
                                    <div id={cx('lenght')}>
                                        <HeartComponent />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            {isError && (
                <div className={cx('wrapper-disconnect-network')}>
                    <ListSongIcon className={cx('icon')} />
                    <p className={cx('disconnect-network-title')}>Album không tồn tại</p>
                </div>
            )}
        </div>
    );
}

export default memo(AlbumUserPage);
