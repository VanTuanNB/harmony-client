import classNames from 'classnames/bind';
import { faHome, faStar, faMusic, faBookmark } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBarNavigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import PlaylistSymlinkComponent from './Playlist/PlaylistSymlink/PlaylistSymlink.component';

const cx = classNames.bind(styles);

function SideBarNavigation() {
    return (
        <div className={cx('sidebar-navigation')}>
            <div className={cx('left-sidebar')}>
                <div className={cx('navigation')}>
                    <div className={cx('icon-logo')}>
                        <Image className={cx('logo')} src="/images/logo-1.png" width={50} height={50} alt="" />
                        <h3 className={cx('title')}>Harmory Music</h3>
                    </div>
                    <ul>
                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                                <span>Home</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faMusic} className={cx('icon')} />
                                <span>Chủ đề & Thể loại</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faStar} className={cx('icon')} />
                                <span>Top 100</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={cx('navigation')} id={cx('navigation-end')}>
                    <ul>
                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faBookmark} className={cx('icon')} />
                                <span>Thư viện</span>
                            </Link>
                        </li>
                    </ul>
                    <div className="wrapper-symlink-content">
                        <PlaylistSymlinkComponent />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBarNavigation;
