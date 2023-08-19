'use client';
import { useGetPlaylistByUserIdQuery } from '@/core/redux/services/playlist.service';
import { faClock, faClose, faPen, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { memo, useCallback, useEffect, useState } from 'react';
import UpdatePlaylist from '../../../components/PopUp/UpdatePlaylist/UpdatePlaylist.component';
import style from './PlayListUser.module.scss';
import HeartComponent from '@/shared/components/Heart/Heart.component';

const cx = classNames.bind(style);

function PlayListUserPage() {
    const [popupUploadPlaylist, setPopupUploadPlaylist] = useState(false);
    const [playlist, setPlaylist] = useState('');
    const path = usePathname();
    const resurt = path.split('/playlist/')[1];
    const apiPlaylist = useGetPlaylistByUserIdQuery(resurt);

    useEffect(() => {
        if (apiPlaylist.data) {
            let profile = apiPlaylist.data.data;
        }
    }, [apiPlaylist.data]);
    const closePopupAlbum = useCallback(() => {
        setPopupUploadPlaylist(false);
    }, []);
    const openPopUpProfile = () => {
        if (!popupUploadPlaylist) {
            setPopupUploadPlaylist(true);
        }
    };
    return (
        <div className={cx('main-album')}>
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <Image src={'/images/playlist.png'} width={232} height={232} alt="" />
                    <button onClick={openPopUpProfile} className={cx('update-profile')}>
                        <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                    </button>
                    {popupUploadPlaylist && <UpdatePlaylist close={closePopupAlbum} />}
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>Playlist</p>
                        <span className={cx('album-name')}>Starboy</span>
                    </div>
                    <div className={cx('detail')}>
                        <Image className={cx('detail-image')} src={''} width={24} height={24} alt="" />
                        <div className={cx('infor')}>
                            <span>
                                <b>The Weeknd</b>
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
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            <Image className={cx('img')} src={'/'} width={40} height={40} alt="" />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('date')}>19/12/2020</div>
                        <div id={cx('lenght')}>
                           <HeartComponent />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            <Image className={cx('img')} src={'/'} width={40} height={40} alt="" />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('date')}>19/12/2020</div>
                        <div id={cx('lenght')}>
                           <HeartComponent />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            <Image className={cx('img')} src={'/'} width={40} height={40} alt="" />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('date')}>19/12/2020</div>
                        <div id={cx('lenght')}>
                           <HeartComponent />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            <Image className={cx('img')} src={'/'} width={40} height={40} alt="" />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('date')}>19/12/2020</div>
                        <div id={cx('lenght')}>
                           <HeartComponent />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
                        <div id={cx('song')}>
                            <Image className={cx('img')} src={'/'} width={40} height={40} alt="" />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('date')}>19/12/2020</div>
                        <div id={cx('lenght')}>
                           <HeartComponent />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(PlayListUserPage);
