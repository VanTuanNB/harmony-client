import React from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './LibraryProfile.module.scss';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function HistoryComponent() {
    return (
        <div className={cx('album-render')}>
            <div className={cx('list-songs')}>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>1</div>
                    <div id={cx('song')}>
                        <Image src={''} alt={''} width={40} height={40}></Image>
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                            <div id={cx('author')}>Sơn Tùng MTP</div>
                        </div>
                    </div>
                    <div id={cx('album')}>0001</div>
                    <div id={cx('date')}>19/12/2020</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                        <span id={cx('lenght')}>3:40</span>
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>2</div>
                    <div id={cx('song')}>
                        <Image src={''} alt={''} width={40} height={40}></Image>
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Chê hộ</div>
                            <div id={cx('author')}>Wxrdie, Gill & Lucin3x</div>
                        </div>
                    </div>
                    <div id={cx('album')}>Starboy</div>
                    <div id={cx('date')}>19/12/2020</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                        <span id={cx('lenght')}>3:40</span>
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>...</div>
                    <div id={cx('song')}>
                        <Image src={''} alt={''} width={40} height={40} />
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Chúng ta của hiện tại</div>
                            <div id={cx('author')}>The Weeknd, Daft Punk</div>
                        </div>
                    </div>
                    <div id={cx('album')}>Starboy</div>
                    <div id={cx('date')}>19/12/2020</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                        <span id={cx('lenght')}>3:40</span>
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>10</div>
                    <div id={cx('song')}>
                        <Image src={''} alt={''} width={40} height={40} />
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Starboy</div>
                            <div id={cx('author')}>The Weeknd, Daft Punk</div>
                        </div>
                    </div>
                    <div id={cx('album')}>Starboy</div>
                    <div id={cx('date')}>19/12/2020</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                        <span id={cx('lenght')}>3:40</span>
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>11</div>
                    <div id={cx('song')}>
                        <Image src={''} alt={''} width={40} height={40}></Image>
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Starboy</div>
                            <div id={cx('author')}>The Weeknd, Daft Punk</div>
                        </div>
                    </div>
                    <div id={cx('album')}>Starboy</div>
                    <div id={cx('date')}>19/12/2020</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                        <span id={cx('lenght')}>3:40</span>
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HistoryComponent;
