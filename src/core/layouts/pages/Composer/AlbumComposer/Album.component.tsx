'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
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
import { faClock, faClose, faPen, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import UpdateAlbum from '../../../components/PopUp/UpdateAlbum/UpdateAlbum.component';
import style from './AlbumComposer.module.scss';

const cx = classNames.bind(style);

function AlbumComposerPage() {
    const [popupUploadAlbum, setPopupUploadAlbum] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const path = usePathname();
    const resurt = path.split('/album/')[1];
    const { data, isLoading, refetch } = useGetServiceAlbumQuery(resurt);
    const [album, setAlbum] = useState<ISong[]>();
    const [putAlbum] = usePutServiceAlbumMutation();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (data) {
            let album = data.data.listSong as ISong[];
            setAlbum(album);
        }
    }, [data, album]);

    useEffect(() => {
        if (isUpdated) {
            refetch();
            setIsUpdated(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdated]);
    const closePopupAlbum = useCallback(() => {
        setPopupUploadAlbum(false);
    }, []);
    const openPopUpProfile = () => {
        if (!popupUploadAlbum) {
            setPopupUploadAlbum(true);
        }
    };

    const handleRemoveItem = async (id: string) => {
        const newListSong = album?.filter((song) => song._id !== id);
        setAlbum(newListSong);
        const listSong = newListSong?.map((item) => item._id);
        const newValue = {
            _id: data?.data._id,
            isNewUploadThumbnail: false,
            userId: data?.data.userReference._id,
            listSong: listSong,
        };
        putAlbum(newValue);
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
                        src={data?.data.thumbnailUrl || '/images/playlist.png'}
                        width={232}
                        height={232}
                        alt=""
                    />
                    <button onClick={openPopUpProfile} className={cx('update-profile')}>
                        <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                    </button>
                    {popupUploadAlbum && album && (
                        <UpdateAlbum setIsUpdated={setIsUpdated} close={closePopupAlbum} dataAlbum={data?.data} />
                    )}
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>Album</p>
                        <span className={cx('album-name')}>{data?.data.title}</span>
                    </div>

                    <p className={cx('information')}>{data?.data.information}</p>
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
                </div>
                <div className={cx('list-songs')}>
                    {album?.map((song, index) => (
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