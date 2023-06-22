'use client';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import InputSearchComponent from '@/shared/components/InputSearch/InputSearch.component';
import HeaderRight from './HeaderRight/HeaderRight.component';

const cx = classNames.bind(styles);

function HeaderComponent() {
    return (
        <header className={cx('header')}>
            <div className={cx('header-left')}>
                <div className={cx('header-roadMap')}>
                    <Link href={'/'} className={cx('button-roadMap')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Link>
                    <Link href={'/'} className={cx('button-roadMap')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Link>
                </div>
                <InputSearchComponent />
            </div>
            <HeaderRight />
        </header>
    );
}

export default HeaderComponent;
