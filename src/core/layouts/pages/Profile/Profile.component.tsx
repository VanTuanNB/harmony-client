'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Profile.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LibraryProfileComponent from '../LibraryProfile/LibraryProfile.component';

const cx = classNames.bind(styles);

function Profile() {
    const pathName = usePathname();
    const [activeLink, setActiveLink] = useState(pathName === '/profile' ? '/profile/favourite' : pathName);

    const handleLinkClick = (href: string) => {
        setActiveLink(href);
    };

    return (
        <div className={cx('profile')}>
            <div className={cx('profile-user')}>
                <div className={cx('title-profile')}>
                    <h1>Thư viện</h1>
                </div>
                <div className={cx('information')}>
                    <div className={cx('image-profile')}>
                        <Image className={cx('image2')} src="" alt="" width={200} height={200} />
                    </div>
                    <div className={cx('name')}>
                        <h2 className={cx('name-profile')}>Tien Bach</h2>
                    </div>
                </div>
            </div>
            <div>
                <ul className={cx('link')}>
                    <li>
                        <Link
                            className={cx('custom-link', { active: activeLink === '/profile/favourite' })}
                            href={'/profile/favourite'}
                            onClick={() => handleLinkClick('/profile/favourite')}
                        >
                            Farvourite
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={cx('custom-link', { active: activeLink === '/profile/playlist' })}
                            href={'/profile/playlist'}
                            onClick={() => handleLinkClick('/profile/playlist')}
                        >
                            Playlist
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={cx('custom-link', { active: activeLink === '/profile/history' })}
                            href={'/profile/history'}
                            onClick={() => handleLinkClick('/profile/history')}
                        >
                            History
                        </Link>
                    </li>
                </ul>
                <LibraryProfileComponent />
            </div>
        </div>
    );
}

export default Profile;
