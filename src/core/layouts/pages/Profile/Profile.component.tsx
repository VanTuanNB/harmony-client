'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Profile.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faCirclePlay, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Profile() {
    const [isComposer, setIsComposer] = useState(true);
    const [ popupSong, setPopupSong] = useState(false)

    const UploadSong = () => {
        setPopupSong(true)
    };
    return (
        <div className={cx('profile')}>
            <div className={cx('profile-user')}>
                <div className={cx('information')}>
                    <div className={cx('image-profile')}>
                        <Image
                            className={cx('image2')}
                            src="/images/fallback-thumbnail-user.jpg"
                            alt=""
                            width={200}
                            height={200}
                        />
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
                            <button onClick={UploadSong}>
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
                        {/* {popupSong && <CreateS} */}
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
