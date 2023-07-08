import classNames from 'classnames/bind';
import { faHome, faFolder, faHistory, faStar, faMusic } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBarNavigation.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';

const cx = classNames.bind(styles);

function SideBarNavigation() {
    return (
        <div className={cx('sidebar-navigation')}>
            <div className={cx('left-sidebar')}>
                <div className={cx('icon-logo')}>
                    <Image src={''} width={50} height={50} alt="" />
                    <h3>Harmory Music</h3>
                </div>
                <div className={cx('navigation')}>
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
                <hr />
                <div className={cx('navigation')}>
                    <ul>
                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faFolder} className={cx('icon')} />
                                <span>Your Library</span>
                            </Link>
                        </li>

                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faHistory} className={cx('icon')} />
                                <span>History</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBarNavigation;
