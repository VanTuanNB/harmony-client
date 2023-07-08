import classNames from 'classnames/bind';
import { faHome, faFolder, faHistory } from '@fortawesome/free-solid-svg-icons';
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
                <div className={cx('navigaiton')}>
                    <ul>
                        <li>
                            <Link href="">
                                <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                                <span>Home</span>
                            </Link>
                        </li>
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
