'use client';
import { IUser } from '@/core/common/interfaces/collection.interface';
import CreateAlbum from '@/core/layouts/components/PopUp/CreateAlbum/CreateAlbum.component';
import CreateSongComponent from '@/core/layouts/components/PopUp/CreateSong/CreateSong.component';
import UpdateProfile from '@/core/layouts/components/PopUp/UpdateProfile/UpdateProfile.component';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { AlbumIcon, HeartIcon1, HeartIcon2, HeartIcon3, ListSongIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import { faAdd, faCirclePlay, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const path = usePathname();
    const resurt = path.split('/profile/')[1];
    const [isComposer, setIsComposer] = useState('');
    const [popupSong, setPopupSong] = useState(false);
    const [popupUploadProfile, setPopupUploadProfile] = useState(false);
    const [popupCreateAlbum, setPopupCreateAlbum] = useState(false);
    const [profile, setProfile] = useState<IUser>();
    const apiUser = useGetServiceProfileQuery(resurt);
    // const apiGetHistory = useGetHistoryByUserIdQuery();
    // const apiGetFavorite = useGetFavoriteByUserIdQuery()

    useEffect(() => {
        if (apiUser.data) {
            let profile = apiUser.data.data;
            console.log(profile);

            if (profile) {
                setIsComposer(profile.role);
                setProfile(profile);
            }
        }
    }, [apiUser.data, isComposer, profile]);

    const closePopupSong = useCallback(() => {
        setPopupSong(false);
    }, []);
    const closePopupAlbum = useCallback(() => {
        setPopupCreateAlbum(false);
    }, []);
    const closePopupProfile = useCallback(() => {
        setPopupUploadProfile(false);
    }, []);
    const openPopUpSong = () => {
        if (!popupSong) {
            setPopupSong(true);
        }
    };
    const openPopUpProfile = () => {
        if (!popupUploadProfile) {
            setPopupUploadProfile(true);
        }
    };
    const openPopUpAlbum = () => {
        if (!popupCreateAlbum) {
            setPopupCreateAlbum(true);
        }
    };
    return (
        <div className={cx('profile')}>
            {apiUser.isLoading && <SkeletonLoading count={20} />}
            {profile && (
                <>
                    <div className={cx('profile-user')}>
                        <div className={cx('information')}>
                            <div className={cx('image-profile')}>
                                <Image
                                    className={cx('image2')}
                                    src={profile?.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                    alt=""
                                    width={200}
                                    height={200}
                                />

                                <button onClick={openPopUpProfile} className={cx('update-profile')}>
                                    <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                                </button>
                                {popupUploadProfile && <UpdateProfile close={closePopupProfile} data={profile} />}
                            </div>
                            <div className={cx('name')}>
                                <p>Profile</p>
                                <h2 className={cx('name-profile')}>{profile?.name}</h2>
                                <p>{profile?.playlistReference?.length} PlayList</p>
                            </div>
                        </div>
                    </div>
                    {isComposer === 'composer' && (
                        <div className={cx('composer')}>
                            <div className={cx('composer-song')}>
                                <div className={cx('control-title')}>
                                    <h2>Bài hát đã tải lên</h2>
                                    <div className={cx('btn')}>
                                        <button onClick={openPopUpSong}>
                                            <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                                        </button>
                                        {profile.songsReference?.length !== 0 && (
                                            <Link href={`/profile/song/${profile._id}`}>Xem tất cả</Link>
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
                                                                width={40}
                                                                height={40}
                                                            ></Image>
                                                            <div id={cx('song-title')}>
                                                                <div id={cx('title')}>{item.title}</div>
                                                                <div id={cx('author')}>{profile.name}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx('single-right')}>
                                                        <div id={cx('album')}>{formatDate(item.publish)}</div>
                                                        <div className={cx('heart-container')} title="Like">
                                                            <input
                                                                type="checkbox"
                                                                className={cx('checkbox')}
                                                                id="Give-It-An-Id"
                                                            />
                                                            <div className={cx('svg-container')}>
                                                                <HeartIcon1 className={cx('svg-outline')} />
                                                                <HeartIcon2 className={cx('svg-filled')} />
                                                                <HeartIcon3 className={cx('svg-celebrate')} />
                                                            </div>
                                                        </div>
                                                        <div id={cx('lenght')}>
                                                            <span id={cx('lenght')}>3:40</span>
                                                        </div>
                                                        <Link href={`/user/song/${item._id}`} className={cx('edit')}>
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
                                {popupSong && <CreateSongComponent close={closePopupSong} />}
                            </div>
                            <div className={cx('composer-album')}>
                                <div className={cx('control-title')}>
                                    <h2>Album đã tạo</h2>
                                    <div className={cx('btn')}>
                                        <button onClick={openPopUpAlbum}>
                                            <FontAwesomeIcon className={cx('icon-add')} icon={faAdd} />
                                        </button>
                                        {profile.albumsReference?.length !== 0 && <Link href={''}>Xem tất cả</Link>}
                                    </div>
                                </div>
                                <div className={cx('list')}>
                                    {profile.albumsReference?.map((item, key) => {
                                        return (
                                            <>
                                                <div className={cx('item')}>
                                                    <Image
                                                        src={item.thumbnailUrl || '/images/fallback-thumbnail-user.jpg'}
                                                        alt=""
                                                        width={100}
                                                        height={100}
                                                    />
                                                    <h3>{item.title}</h3>
                                                    <p>{item.information}</p>
                                                </div>
                                            </>
                                        );
                                    })}
                                    {profile.albumsReference?.length === 0 && (
                                        <div className={cx('albumNot')}>
                                            <AlbumIcon className={cx('icon-album')} />
                                            <h2>Bạn chưa tạo Album</h2>
                                        </div>
                                    )}
                                </div>
                                {popupCreateAlbum && <CreateAlbum close={closePopupAlbum} />}
                            </div>
                        </div>
                    )}
                    <div className={cx('history')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Bài hát đã nghe</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                            <div className={cx('btn')}>
                                <Link href={''}>Xem tất cả</Link>
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>1</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>

                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>2</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>

                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>3</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>
                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('playlist')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>PlayList của bạn</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                        </div>
                        <div className={cx('list')}>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('favorite')}>
                        <div className={cx('control-title')}>
                            <div className={cx('title-left')}>
                                <h2>Bài hát yêu thích</h2>
                                <p>Chỉ hiển thị với bạn</p>
                            </div>
                            <div className={cx('btn')}>
                                <Link href={''}>Xem tất cả</Link>
                            </div>
                        </div>
                        <div className={cx('list-songs')}>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>1</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>

                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>1</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>

                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('single-song')}>
                                <div className={cx('single-left')}>
                                    <div id={cx('id')}>1</div>
                                    <div id={cx('song')}>
                                        <Image
                                            src={'/images/fallback-thumbnail-user.jpg'}
                                            alt={''}
                                            width={40}
                                            height={40}
                                        ></Image>
                                        <div id={cx('song-title')}>
                                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                                            <div id={cx('author')}>Sơn Tùng MTP</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('single-right')}>
                                    <div id={cx('album')}>Tìm em đến lúc nào</div>

                                    <div className={cx('heart-container')} title="Like">
                                        <input type="checkbox" className={cx('checkbox')} id="Give-It-An-Id" />
                                        <div className={cx('svg-container')}>
                                            <HeartIcon1 className={cx('svg-outline')} />
                                            <HeartIcon2 className={cx('svg-filled')} />
                                            <HeartIcon3 className={cx('svg-celebrate')} />
                                        </div>
                                    </div>
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
