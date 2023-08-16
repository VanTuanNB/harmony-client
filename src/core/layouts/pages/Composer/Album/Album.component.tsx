'use client';
import { IAlbum, ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushSongIntoPrevPlayListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetServiceAlbumQuery } from '@/core/redux/services/album.service';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { faClock, faClose, faPen, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import UpdateAlbum from '../../../components/PopUp/UpdateAlbum/UpdateAlbum.component';
import style from './Album.module.scss';

const cx = classNames.bind(style);

function AlbumPage() {
    const [popupUploadAlbum, setPopupUploadAlbum] = useState(false);
    const [album, setAlbum] = useState<IAlbum>();
    const path = usePathname();
    const resurt = path.split('/album/')[1];
    const apiAlbum = useGetServiceAlbumQuery(resurt);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (apiAlbum.data) {
            let album = apiAlbum.data.data;
            console.log(album);

            if (album) {
                setAlbum(album);
            }
        }
    }, [apiAlbum.data]);
    const closePopupAlbum = useCallback(() => {
        setPopupUploadAlbum(false);
    }, []);
    const openPopUpProfile = () => {
        if (!popupUploadAlbum) {
            setPopupUploadAlbum(true);
        }
    };

    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (_id: string) => {
        const songSelected = store.playlist.suggests.find((song) => song._id === _id);
        dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
        dispatch(startPlayingAction(songSelected as ISong));
    };
    return (
        <div className={cx('main-album')}>
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <Image className={cx('album-img')} src={'/images/playlist.png'} width={232} height={232} alt="" />
                    <button onClick={openPopUpProfile} className={cx('update-profile')}>
                        <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                    </button>
                    {popupUploadAlbum && <UpdateAlbum close={closePopupAlbum} dataAlbum={album} />}
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
                    {album?.listSong.map((song, index) => (
                        <div key={index} className={cx('single-song')}>
                            <div id={cx('id')}>{index + 1}</div>
                            <div onClick={() => onClick(song._id)} id={cx('song')}>
                                <Image className={cx('img')} src={song.thumbnailUrl} width={40} height={40} alt="" />
                                <div id={cx('song-title')}>
                                    <div id={cx('title')}>{song.title}</div>
                                    <div id={cx('author')}>{album.userReference.name}</div>
                                </div>
                            </div>
                            <div id={cx('album')}>{album.title}</div>
                            <div id={cx('date')}>{format(new Date(song.publish), 'dd-MM-yyyy HH:mm:ss')}</div>
                            <div id={cx('lenght')}>
                                <HeartComponent />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AlbumPage;
