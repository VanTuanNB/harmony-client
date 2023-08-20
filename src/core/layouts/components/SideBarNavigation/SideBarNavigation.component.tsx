import { ELocalStorageKey } from '@/core/common/constants/common.constant';
import { EDataTheme } from '@/core/common/constants/reduxSlice.constant';
import { selectClientStoreReducer } from '@/core/redux/features/client/client.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import { MainLogo } from '@/shared/components/Svg/index.component';
import { faBookmark, faHome, faMusic, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Link from 'next/link';
import PlaylistSymlinkComponent from './Playlist/PlaylistSymlink/PlaylistSymlink.component';
import styles from './SideBarNavigation.module.scss';

const cx = classNames.bind(styles);

function SideBarNavigation() {
    const store = useAppSelector(selectClientStoreReducer);
    const currentTheme = store.localStoreSide[ELocalStorageKey.DATA_THEME];
    return (
        <div className={cx('sidebar-navigation')}>
            <div className={cx('left-sidebar')}>
                <div className={cx('navigation')}>
                    <Link href={'/'} className={cx('icon-logo')}>
                        <MainLogo
                            fillIcon={currentTheme === EDataTheme.DARK ? 'white' : 'black'}
                            className={cx('Layer_1')}
                        />
                    </Link>
                    <ul>
                        <li>
                            <Link href="/">
                                <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                                <span>Trang chủ</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="/genres">
                                <FontAwesomeIcon icon={faMusic} className={cx('icon')} />
                                <span>Chủ đề & Thể loại</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/topSong">
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
