import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './PlaylistSymlink.module.scss';

const cx = classNames.bind(styles);

export default function PlaylistSymlinkComponent() {
    return (
        <div className={cx('right-slide')}>
            <div className={cx('main-container')}>
                <div className={cx('main-header')}>
                    <div className={cx('header-menu')}>
                        <a href="#" className={cx('main-header-link')}>
                            Playlists
                        </a>
                        <a href="#" className={cx('main-header-link')}>
                            Test1
                        </a>
                        <a href="#" className={cx('main-header-link')}>
                            Test2
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx('search-sidebar')}>
                <div className={cx('container')}>
                    <input placeholder="Type to search..." className={cx('input')} name="text" type="text" />
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                    </div>
                </div>
                <FontAwesomeIcon icon={faPlus} className={cx('icon1')} />
            </div>
            <div className={cx('album-render')}>
                <div className={cx('list-songs')}>
                    <div className={cx('single-song')}>
                        <div id={cx('song')}>
                            <Image src={'/'} alt={''} width={40} height={40}></Image>
                            <div id={cx('song-title')}>
                                <div id={cx('title')}>Chúng ta của hiện tại</div>
                                <div id={cx('author')}>Sơn Tùng MTP</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
