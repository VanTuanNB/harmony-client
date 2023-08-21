import { IUser } from '@/core/common/interfaces/collection.interface';
import CreateAlbumComponent from '@/core/layouts/components/PopUp/CreateAlbum/CreateAlbum.component';
import CreateSongComponent from '@/core/layouts/components/PopUp/CreateSong/CreateSong.component';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { AlbumIcon, ListSongIcon } from '@/shared/components/Svg/index.component';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import style from './Composer.module.scss';

const cx = classNames.bind(style);

interface IComposer {
    isComposer: string;
    profile: IUser;
}
function ComposerPage({ isComposer, profile }: IComposer) {
    const [isUpdated, setIsUpdated] = useState(false);
    const [popupSong, setPopupSong] = useState(false);
    const [popupCreateAlbum, setPopupCreateAlbum] = useState(false);

    const closePopupSong = useCallback(() => {
        setPopupSong(false);
        window.location.reload();
    }, []);

    const closePopupAlbum = useCallback((isReload: boolean) => {
        if (isReload) {
            setPopupCreateAlbum(false);
            window.location.reload();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isComposer === 'composer' && (
                <div className={cx('composer')}>
                    <div className={cx('composer-song')}>
                        <div className={cx('control-title')}>
                            <h2>Bài hát đã tải lên</h2>
                            <div className={cx('btn')}>
                                <button onClick={() => setPopupSong(true)}>
                                    <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                                </button>
                                {profile.songsReference?.length !== 0 && (
                                    <Link href={`/composer/song/${profile._id}`}>Xem tất cả</Link>
                                )}
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            {profile.songsReference?.map((item, index) => {
                                return (
                                    <>
                                        <div key={item._id} className={cx('single-song')}>
                                            <div className={cx('single-left')}>
                                                <div id={cx('id')}>{index + 1}</div>
                                                <div id={cx('song')}>
                                                    <Image
                                                        src={item.thumbnailUrl}
                                                        alt={''}
                                                        width={100}
                                                        height={100}
                                                    ></Image>
                                                    <div id={cx('song-title')}>
                                                        <div id={cx('title')}>{item.title}</div>
                                                        <div id={cx('author')}>{profile.name}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('single-right')}>
                                                <div id={cx('album')}>
                                                    {item.albumReference?.map((item, index) => (
                                                        <Link href={'/composer/album/' + item._id} key={index}>
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </div>
                                                <HeartComponent />
                                                <div id={cx('lenght')}>
                                                    <span id={cx('lenght')}>3:40</span>
                                                </div>
                                                <Link href={''} className={cx('edit')}>
                                                    Sửa
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                            {profile.songsReference?.length === 0 && (
                                <div className={cx('albumNot')}>
                                    <ListSongIcon className={cx('icon-album')} />
                                    <h2>Bạn chưa tải bài hát lên</h2>
                                </div>
                            )}
                        </div>
                        {popupSong && (
                            <CreateSongComponent data={profile} setIsUpdated={setIsUpdated} close={closePopupSong} />
                        )}
                    </div>
                    <div className={cx('composer-album')}>
                        <div className={cx('control-title')}>
                            <h2>Album đã tạo</h2>
                            <div className={cx('btn')}>
                                <button onClick={() => setPopupCreateAlbum(true)}>
                                    <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                                </button>
                                {profile.albumsReference?.length !== 0 && <Link href={''}>Xem tất cả</Link>}
                            </div>
                        </div>
                        <div className={cx('list')}>
                            {profile.albumsReference?.map((item, key) => {
                                return (
                                    <Link className={cx('item')} href={'/composer/album/' + item._id} key={key}>
                                        {item.thumbnailUrl && (
                                            <Image src={item.thumbnailUrl} alt="" width={500} height={500} />
                                        )}
                                        {item.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                                        <h3>{item.title}</h3>
                                        <p>{item.information}</p>
                                    </Link>
                                );
                            })}
                            {profile.albumsReference?.length === 0 && (
                                <div className={cx('albumNot')}>
                                    <AlbumIcon className={cx('icon-album')} />
                                    <h2>Bạn chưa tạo Album</h2>
                                </div>
                            )}
                        </div>
                        {popupCreateAlbum && <CreateAlbumComponent close={closePopupAlbum} dataProfile={profile} />}
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(ComposerPage);
