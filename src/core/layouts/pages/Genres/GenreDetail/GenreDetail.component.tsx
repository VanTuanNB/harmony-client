'use client';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { faClock, faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './GenreDtail.module.scss';
const cx = classNames.bind(styles);

function GenreDetailPage() {
    const router = usePathname();
    const genreId = router.split('/genres/')[1];
    console.log(genreId);
    return (
        <div className={cx('genre-detail')}>
            <div className={cx('infor')}>
                <div className={cx('infor-image')}>
                    <Image src="" width={230} height={230} alt="" />
                </div>
                <div className={cx('infor-title')}>
                    <span>Genres detail</span>
                    <h1>GENRES DETAIL</h1>
                </div>
            </div>
            <div className={cx('btn-icon')}>
                <FontAwesomeIcon className={cx('icon-Play')} icon={faPlayCircle} />
            </div>
            <div className={cx('search-songs')}>
                <div className={cx('result-render')}>
                    <div className={cx('title')}>
                        <div id={cx('id')}>#</div>
                        <div id={cx('song')}>Bài hát</div>
                        <div id={cx('album')}>Album</div>
                        <div id={cx('lenght')}>
                            <FontAwesomeIcon icon={faClock} />
                        </div>
                    </div>
                    <div className={cx('list-songs')}>
                        <div className={cx('single-song')}>
                            <div id={cx('id')}>1</div>
                            <div id={cx('song')}>
                                <Image src="" width={40} height={40} alt="" />
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
                            <div id={cx('id')}>2</div>
                            <div id={cx('song')}>
                                <Image src="" width={40} height={40} alt="" />
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
                            <div id={cx('id')}>...</div>
                            <div id={cx('song')}>
                                <Image src="" width={40} height={40} alt="" />
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
                            <div id={cx('id')}>10</div>
                            <div id={cx('song')}>
                                <Image src="" width={40} height={40} alt="" />
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
                            <div id={cx('id')}>11</div>
                            <div id={cx('song')}>
                                <Image src="" width={40} height={40} alt="" />
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
        </div>
    );
}
export default GenreDetailPage;
