import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function HeaderComponent() {
    return (
        <header className={cx('header')}>
            <div className={cx('header-left')}>
                <div className={cx('header-roadMap')}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <div className={cx('header-search')}>
                    <div className={cx('')}></div>
                </div>
            </div>
            <div className={cx('header-right')}></div>
        </header>
    );
}

export default HeaderComponent;
