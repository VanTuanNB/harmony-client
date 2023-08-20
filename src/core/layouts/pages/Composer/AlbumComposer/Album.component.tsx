'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import UpdateSongComponent from '@/core/layouts/components/PopUp/UpdateSong/UpdateSong.component';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceAlbumQuery, usePutServiceAlbumMutation } from '@/core/redux/services/album.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { formatDate } from '@/utils/format.util';
import { faAdd, faClock, faClose, faPen, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import UpdateAlbum from '../../../components/PopUp/UpdateAlbum/UpdateAlbum.component';
import style from './AlbumComposer.module.scss';

const cx = classNames.bind(style);

function AlbumComposerPage() {
    const path = usePathname();
    const router = useRouter();
    const resurt = path.split('/album/')[1];
    const [popupUploadAlbum, setPopupUploadAlbum] = useState(false);
    const [popupUploadSong, setPopupUploadSong] = useState(false);
    const { data, isLoading, refetch } = useGetServiceAlbumQuery(resurt);
    const [putAlbum] = usePutServiceAlbumMutation();
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

    const handleRemoveItem = async (id: string) => {
        const newListSong = data?.data.listSong.reduce((acc: string[], cur: ISong, index) => {
            if (cur._id === id) return acc;
            acc.push(cur._id);
            return acc;
        }, []);
        putAlbum({ _id: data?.data._id, listSong: newListSong as any });
        refetch();
    };

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
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
            <div className={cx('btn-icon')}>
                <FontAwesomeIcon className={cx('icon-Play')} icon={faPlayCircle} />
            </div>

            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('date')}>Ngày phát hành</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon className={cx('icon-clock')} icon={faClock} />
                    </div>
                    <button className={cx('uploadSong')} onClick={() => setPopupUploadSong(true)}>
                        <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                    </button>
                </div>
                <div className={cx('list-songs')}>
                    {data?.data.listSong.map((song, index) => (
                        <div key={index} className={cx('single-song')}>
                            <div id={cx('id')}>{index + 1}</div>
                            <div onClick={() => onClick(song._id)} id={cx('song')}>
                                <Image className={cx('img')} src={song.thumbnailUrl} width={40} height={40} alt="" />
                                <div id={cx('song-title')}>
                                    <div id={cx('title')}>{song.title}</div>
                                    <div id={cx('author')}>{data?.data.userReference.name}</div>
                                </div>
                            </div>
                            <div id={cx('album')}>{data?.data.title}</div>
                            <div id={cx('date')}>{formatDate(song.publish)}</div>
                            <div id={cx('lenght')}>
                                <HeartComponent />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon
                                    onClick={() => handleRemoveItem(song._id)}
                                    id={cx('icon')}
                                    icon={faClose}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(AlbumComposerPage);
