'use client';
import { IAlbum } from '@/core/common/interfaces/collection.interface';
import { useGetServiceAlbumQuery } from '@/core/redux/services/album.service';
import { HeartIcon1, HeartIcon2, HeartIcon3 } from '@/shared/components/Svg/index.component';
import { faClock, faClose, faPen, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
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

    useEffect(() => {
        if (apiAlbum.data) {
            let profile = apiAlbum.data.data;

            if (profile) {
                setAlbum(profile);
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
    return (
        <div className={cx('main-album')}>
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <Image className={cx('album-img')} src={'/images/playlist.png'} width={232} height={232} alt="" />
                    <button onClick={openPopUpProfile} className={cx('update-profile')}>
                        <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                    </button>
                    {popupUploadAlbum && <UpdateAlbum close={closePopupAlbum} data={album} />}
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>Album</p>
                        <span className={cx('album-name')}>Starboy</span>
                    </div>
                    <div className={cx('detail')}>
                        <Image className={cx('detail-image')} src={'/'} width={24} height={24} alt="" />
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
                            <div className={cx('heart-container')} title="Like">
                                <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                <div className={cx('svg-container')}>
                                    <HeartIcon1 className={cx('svg-outline')} />
                                    <HeartIcon2 className={cx('svg-filled')} />
                                    <HeartIcon3 className={cx('svg-celebrate')} />
                                </div>
                            </div>
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
                            <div className={cx('heart-container')} title="Like">
                                <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                <div className={cx('svg-container')}>
                                    <HeartIcon1 className={cx('svg-outline')} />
                                    <HeartIcon2 className={cx('svg-filled')} />
                                    <HeartIcon3 className={cx('svg-celebrate')} />
                                </div>
                            </div>
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
                            <div className={cx('heart-container')} title="Like">
                                <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                <div className={cx('svg-container')}>
                                    <HeartIcon1 className={cx('svg-outline')} />
                                    <HeartIcon2 className={cx('svg-filled')} />
                                    <HeartIcon3 className={cx('svg-celebrate')} />
                                </div>
                            </div>
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
                            <div className={cx('heart-container')} title="Like">
                                <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                <div className={cx('svg-container')}>
                                    <HeartIcon1 className={cx('svg-outline')} />
                                    <HeartIcon2 className={cx('svg-filled')} />
                                    <HeartIcon3 className={cx('svg-celebrate')} />
                                </div>
                            </div>
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
                            <div className={cx('heart-container')} title="Like">
                                <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                <div className={cx('svg-container')}>
                                    <HeartIcon1 className={cx('svg-outline')} />
                                    <HeartIcon2 className={cx('svg-filled')} />
                                    <HeartIcon3 className={cx('svg-celebrate')} />
                                </div>
                            </div>
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faClose} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlbumPage;
