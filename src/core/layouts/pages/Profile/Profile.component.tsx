'use client';
import { faAdd, faCirclePlay, faEllipsis, faHeart, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import CreateSongComponent from '../../components/CreateSong/CreateSong.component';
import UpdateProfile from '../../components/UpdateProfile/UpdateProfile.component';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [isComposer, setIsComposer] = useState(false);
    const [popupSong, setPopupSong] = useState(false);
    const [popupUploadProfile, setPopupUploadProfile] = useState(false);

    const closePopup = useCallback(() => {
        setPopupSong(false);
    }, []);
    const stateCreateSong = () => {
        if (!popupSong) {
            setPopupSong(true);
        }
        if (!popupUploadProfile) {
            setPopupUploadProfile(true);
        }
    };
    return (
        <div className={cx('profile')}>
            <div className={cx('profile-user')}>
                <div className={cx('information')}>
                    <div className={cx('image-profile')}>
                        <Image
                            className={cx('image2')}
                            src="https://lh3.googleusercontent.com/a/AAcHTtclC7haEXrV3ctE2qTse-FW93HQGJeVzExHCeCbJLM3dNA=s96-c"
                            alt=""
                            width={200}
                            height={200}
                        />

                        <button onClick={stateCreateSong} className={cx('update-profile')}>
                            <FontAwesomeIcon icon={faPen} className={cx('icon-edit')} />
                        </button>
                        {popupUploadProfile && <UpdateProfile />}
                    </div>
                    <div className={cx('name')}>
                        <p>Profile</p>
                        <h2 className={cx('name-profile')}>Nguyễn Quang Huy</h2>
                        <p>2 Public PlayList</p>
                    </div>
                </div>
            </div>
            {isComposer && (
                <div className={cx('composer')}>
                    <div className={cx('composer-song')}>
                        <div className={cx('control-title')}>
                            <h2>My Song</h2>
                            <button onClick={stateCreateSong}>
                                <FontAwesomeIcon icon={faAdd} />
                            </button>
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
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                        <FontAwesomeIcon id={cx('icon')} icon={faPen} />
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
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                        <FontAwesomeIcon id={cx('icon')} icon={faPen} />
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
                                    <div id={cx('lenght')}>
                                        <span id={cx('lenght')}>3:40</span>
                                        <FontAwesomeIcon id={cx('icon')} icon={faPen} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {popupSong && <CreateSongComponent close={closePopup} />}
                    </div>
                    <div className={cx('composer-album')}>
                        <div className={cx('control-title')}>
                            <h2>My Album</h2>
                            <button>
                                <FontAwesomeIcon icon={faAdd} />
                            </button>
                        </div>
                        <div className={cx('list')}>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                            <div className={cx('item')}>
                                <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                                <h3>Đi để trở về</h3>
                                <p>By JosephHuy</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className={cx('history')}>
                <h2>My history song</h2>
                <p>Only visible to you</p>
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
                            <div id={cx('lenght')}>
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
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
                            <div id={cx('lenght')}>
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
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
                            <div id={cx('lenght')}>
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('playlist')}>
                <h2>My PlayList song</h2>
                <p>Only visible to you</p>
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
                <h2>My favourite song</h2>
                <p>Only visible to you</p>
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
                            <div id={cx('lenght')}>
                                <FontAwesomeIcon id={cx('icon1')} icon={faHeart} />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
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
                            <div id={cx('lenght')}>
                                <FontAwesomeIcon id={cx('icon1')} icon={faHeart} />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
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
                            <div id={cx('lenght')}>
                                <FontAwesomeIcon id={cx('icon1')} icon={faHeart} />
                                <span id={cx('lenght')}>3:40</span>
                                <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
