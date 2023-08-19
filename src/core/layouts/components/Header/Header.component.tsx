'use client';
import Link from 'next/link';

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectUserReducer } from '@/core/redux/features/user/user.slice';
import { useAppSelector } from '@/core/redux/hook.redux';
import InputSearchComponent from '@/shared/components/InputSearch/InputSearch.component';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import styles from './Header.module.scss';
import HeaderAuth from './HeaderAuth/HeaderAuth.component';
import HeaderRight from './HeaderRight/HeaderRight.component';

const cx = classNames.bind(styles);

function HeaderComponent() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { profile } = useAppSelector(selectUserReducer);
    useEffect(() => {
        setIsLoading(true);
    }, [profile]);
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
            {isLoading && (!!profile ? <HeaderRight profile={profile} /> : <HeaderAuth />)}
        </header>
    );
}

export default HeaderComponent;
