import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { IAlbum, ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import CreateAlbumComponent from '@/core/layouts/components/PopUp/CreateAlbum/CreateAlbum.component';
import CreateSongComponent from '@/core/layouts/components/PopUp/CreateSong/CreateSong.component';
import {
    removeSongFromSuggestListAction,
    replaceIntoPrevPlayListAction,
    replaceNewListNextSong,
    selectSongReducer,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { AlbumIcon, ListSongIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import { faAdd, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
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
    const dispatch = useAppDispatch();
    const store: ISongStore = useAppSelector(selectSongReducer);
    const onClick = (song: ISong, index: number) => {
        if (index > 0) {
            const prevSongs =
                (profile &&
                    profile.songsReference &&
                    profile.songsReference.filter((item: ISong, itemIndex: number) => itemIndex < index)) ||
                [];
            dispatch(replaceIntoPrevPlayListAction(prevSongs));
        }
        const nextSongs =
            (profile &&
                profile.songsReference &&
                profile.songsReference.filter((item: ISong, itemIndex: number) => itemIndex > index)) ||
            [];
        dispatch(replaceNewListNextSong(nextSongs));
        dispatch(removeSongFromSuggestListAction(song._id));
        dispatch(startPlayingAction(song));
    };
    const handlePlaying = () => {
        dispatch(updateStatePlayingAction(EStateCurrentSong.PLAYING));
    };
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
                                    <Link href={`/composer/${profile._id + '/song'}`}>Xem tất cả</Link>
                                )}
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            {profile.songsReference?.slice(0, 4)?.map((item: ISong, index: number) => {
                                return (
                                    <div
                                        key={index}
                                        className={cx(
                                            'single-song',
                                            store.playing.currentSong._id === item._id && 'active',
                                        )}
                                    >
                                        <div className={cx('id')}>{index + 1}</div>
                                        <div className={cx('song')} onClick={() => onClick(item, index)}>
                                            <div className={cx('wrapper-img')}>
                                                <Image
                                                    className={cx('img')}
                                                    src={item.thumbnailUrl}
                                                    width={40}
                                                    height={40}
                                                    alt=""
                                                />
                                                {store.playing.currentSong._id === item._id && (
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

                                            <div className={cx('song-title')}>
                                                <div className={cx('song-name')}>{item.title}</div>
                                                <div className={cx('author')}>
                                                    {item.performers &&
                                                        !!item.performers.length &&
                                                        item.performers.map((performer) => (
                                                            <Link
                                                                key={performer._id}
                                                                href={`/profile/${performer._id}`}
                                                            >
                                                                {performer.name}
                                                            </Link>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={cx('album')}>
                                            <Tippy
                                                interactive
                                                content={
                                                    <ul className={cx('list-tooltip')}>
                                                        {item.albumReference?.map((album: IAlbum, index: number) => (
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
                                                    {!!item.albumReference?.length ? (
                                                        item.albumReference?.map((album, index) => (
                                                            <Link href={'/user/album/' + album._id} key={index}>
                                                                {album.title}
                                                            </Link>
                                                        ))
                                                    ) : (
                                                        <span
                                                            style={{
                                                                width: '164px',
                                                                display: 'block',
                                                                textAlign: 'center',
                                                            }}
                                                        >
                                                            -
                                                        </span>
                                                    )}
                                                </div>
                                            </Tippy>
                                        </div>

                                        <div className={cx('date')}>{formatDate(item.publish)}</div>
                                        <div className={cx('lenght')}>
                                            <HeartComponent />
                                        </div>
                                    </div>
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
                                    <Link className={cx('item')} href={'/composer/' + item._id + '/album'} key={key}>
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
