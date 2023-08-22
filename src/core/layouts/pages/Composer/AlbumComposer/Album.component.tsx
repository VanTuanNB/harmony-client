'use client';
import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import UpdateSongComponent from '@/core/layouts/components/PopUp/UpdateAlbum/UpdateSong/UpdateSong.component';
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
import { formatDate } from '@/utils/format.util';
import { faEdit, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import UpdateAlbum from '../../../components/PopUp/UpdateAlbum/UpdateAlbum.component';
import style from './AlbumComposer.module.scss';
import PlayingAlbumComponent from './PlayAlbum.component';

const cx = classNames.bind(style);

function AlbumComposerPage() {
    const { slug } = useParams();
    const [popupUploadAlbum, setPopupUploadAlbum] = useState(false);
    const [popupUploadSong, setPopupUploadSong] = useState(false);
    const { data, isLoading, refetch } = useGetServiceAlbumQuery(slug);
    const dispatch = useAppDispatch();

    const handlePopupAlbum = useCallback((isUpdated: boolean) => {
        if (isUpdated) {
            refetch();
            setPopupUploadAlbum(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handlePopupUpdateSong = useCallback((isUpdated: boolean) => {
        if (isUpdated) {
            refetch();
            window.location.reload();
            setPopupUploadSong(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            {isLoading && <SkeletonLoading count={20} />}
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <Image
                        className={cx('album-img')}
                        src={
                            data?.data && data?.data.thumbnailUrl
                                ? `${data?.data.thumbnailUrl}?${new Date().getTime()}`
                                : '/images/playlist.png'
                        }
                        width={500}
                        height={500}
                        alt=""
                    />
                    <button onClick={() => setPopupUploadAlbum(true)} className={cx('update-profile')}>
                        <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                    </button>
                    {popupUploadAlbum && <UpdateAlbum isUpdated={handlePopupAlbum} dataAlbum={data?.data} />}
                    {popupUploadSong && (
                        <UpdateSongComponent
                            songAlbum={data?.data.listSong}
                            isUpdated={handlePopupUpdateSong}
                            dataProfile={data?.data}
                        />
                    )}
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>Album</p>
                        <span className={cx('album-name')}>{data?.data.title}</span>
                    </div>

                    <p className={cx('information')}>
                        {data?.data.information} {!data?.data.information && 'Chưa có mô tả'}
                    </p>

                    <div className={cx('detail')}>
                        <Image
                            className={cx('detail-image')}
                            src={data?.data.userReference.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                            width={24}
                            height={24}
                            alt=""
                        />

                        <div className={cx('infor')}>
                            <span>
                                <b>{data?.data.userReference.name}</b>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {data && data.data && !!data.data.listSong.length && <PlayingAlbumComponent data={data.data.listSong} />}
            <Tippy content="Thêm xoá bài hát">
                <button className={cx('uploadSong')} onClick={() => setPopupUploadSong(true)}>
                    <FontAwesomeIcon className={cx('icon-add')} icon={faEdit} />
                </button>
            </Tippy>
            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('date')}>Ngày phát hành</div>
                </div>
                <div className={cx('list-songs')}>
                    {data?.data.listSong.map((song: ISong, index: number) => (
                        <div
                            key={index}
                            className={cx('single-song', store.playing.currentSong._id === song._id && 'active')}
                        >
                            <div id={cx('id')}>{index + 1}</div>
                            <div id={cx('song')} onClick={() => onClick(song, index)}>
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
        </div>
    );
}

export default memo(AlbumComposerPage);
