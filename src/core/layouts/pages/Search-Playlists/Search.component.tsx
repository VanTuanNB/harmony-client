'use client';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchFilterComponent from '@/shared/components/SearchFilter/SearchFilter.component';
import Image from 'next/image';

const cx = classNames.bind(styles);

function SearchPagePlaylists() {
    return (
        <div className={cx('search-playlists')}>
            <SearchFilterComponent />
            <div className={cx('result-render')}>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
                <div className={cx('single-playlist')}>
                    <div className={cx('mask')}></div>
                    <div className={cx('image')}>
                        <Image src="" width={100} height={100} alt="" />
                        <FontAwesomeIcon icon={faCirclePlay} className={cx('playButton')} />
                    </div>
                    <div className={cx('title')}>
                        <div id={cx('title')}>I Love You</div>
                        <div id={cx('owner')}>By Stuv Targaryen</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SearchPagePlaylists;
