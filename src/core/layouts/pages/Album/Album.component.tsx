'use client';
import classNames from 'classnames/bind';
import style from './Album.module.scss';
import AlbumItem from '@/shared/components/AlbumItem/AlbumItem.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEllipsis, faHeart, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ButtonSwitchTheme from '../../../../shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component'

const cx = classNames.bind(style);

const mockData = [
    {
        _id: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604',
        title: 'Ngày Không Còn Em',
        listSong: [
            {
                _id: '1f1ec177-a843-4e39-8734-e23faf7adbba',
                title: 'Phiêu Bồng',
                duration: 195.63102,
            }
        ],
        updateAt: '2023-06-10T14:35:23.402Z',
    }
];

function AlbumPage () {
    return (
        <div className={cx('main-album')}>
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" 
                        width="232px" 
                    />
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>Album</p>
                        <span className={cx('album-name')}>Starboy</span>
                    </div>
                    <div className={cx('detail')}>
                        <img className={cx('detail-image')} 
                            src="https://yt3.googleusercontent.com/QiI-c4cFyRPD0qVwTQooC3dlgJqHA_t6CpEAv818om-mqL9bqNDL4L_qXQVXx_eY76D_7cLD=s900-c-k-c0x00ffffff-no-rj"
                            alt="" 
                            width={24} 
                            height={24} 
                         />
                        <div className={cx('infor')}>
                            <span><b>The Weeknd</b> • 2016 • 100 thích • 18 bài hát, khoảng 2 giờ</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('album-render')}>
                <div className={cx('title')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('album')}>Album</div>
                    <div id={cx('date')}>Ngày phát hành</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                </div>
                <div className={cx('list-songs')}>
                    <div className={cx('single-song')}>
                        <div id={cx('id')}>1</div>
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
                        <div id={cx('date')}>19/12/2020</div>
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

export default AlbumPage;