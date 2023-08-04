'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Profile.module.scss';
import Link from 'next/link';
import PlaylistComponent from '@/shared/components/Playlist/Playlist.component';
import PlaylistSongComponent from '@/shared/components/Listsong/PlaylistSong.component';
import ListSongComponent from '@/shared/components/Listsong/ListSong.component';

const cx = classNames.bind(styles);

function Profile() {
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
                        <Link className={cx('custom-link')} href={'/profile/favorit'}>
                            Farvorite
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('custom-link')} href={'/profile/playlist'}>
                            Playlist
                        </Link>
                    </li>
                    <li>
                        <Link className={cx('custom-link')} href={'/profile/history'}>
                            History
                        </Link>
                    </li>
                </ul>
                <ListSongComponent />
            </div>
        </div>
    );
}

export default Profile;
