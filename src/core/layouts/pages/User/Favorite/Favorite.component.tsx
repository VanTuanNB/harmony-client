'use client';
import { HeartIcon1, HeartIcon2, HeartIcon3 } from '@/shared/components/Svg/index.component';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './Favorit.module.scss';

const cx = classNames.bind(style);

function FavoritePage() {
    return (
        <div className={cx('main-album')}>
            <div className={cx('title')}>
                <h2>Danh sách bài hát yêu thích</h2>
                <p>Chỉ hiển thị với bạn</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavoritePage;
