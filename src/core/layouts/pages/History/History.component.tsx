'use client';
import classNames from 'classnames/bind';
import style from './History.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function HistoryPage() {
    return (
        <div className={cx('main-history')}>
            <div className={cx('header')}>
                <div className={cx('title')}>Phát gần đây</div>
                <ul className={cx('menu-bar')}>
                    <li className={cx('menu')}>BÀI HÁT</li>
                    <li className={cx('menu')}>PLAYLIST</li>
                    <li className={cx('menu')}>MV</li>
                    <li className={cx('menu')}>RADIO</li>
                    <li className={cx('menu')}>PODCAST</li>
                </ul>
            </div>
            <hr className={cx('line')}/>
            <div className={cx('album-render')}>
                <div className={cx('list-songs')}>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
                                width={'40px'}
                            />
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Starboy</div>
                                <div id={cx('author')}>The Weeknd, Daft Punk</div>
                            </div>
                        </div>
                        <div id={cx('album')}>Starboy</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon id={cx('icon')} icon={faHeart} />
                            <span id={cx('lenght')}>3:40</span>
                            <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HistoryPage;