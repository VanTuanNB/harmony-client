'use client';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab: React.SetStateAction<string>) => {
        setActiveTab(tab);
    };

    return (
        <div className={cx('profile-main')}>
            <div className={cx('title-profile')}>
                <h1>Your Library</h1>
            </div>
            <div className={cx('information')}>
                <div className={cx('image-profile')}>
                    <Image className={cx('image2')} src="" alt="" width={200} height={200} />
                </div>
                <div className={cx('name')}>
                    <h2 className={cx('name-profile')}>Phan Tien Bach</h2>
                </div>
            </div>
            <div className={cx('tabs')}>
                <div className={cx('tab', { active: activeTab === 'tab1' })} onClick={() => handleTabChange('tab1')}>
                    SONGS
                </div>
                <div className={cx('tab', { active: activeTab === 'tab2' })} onClick={() => handleTabChange('tab2')}>
                    ALBUM
                </div>
                <div className={cx('tab', { active: activeTab === 'tab3' })} onClick={() => handleTabChange('tab3')}>
                    ARTIST
                </div>
            </div>
            <hr className={cx('hr')} />
            <div className={cx('tab-content')}>
                {activeTab === 'tab1' && (
                    <div className={cx('playlist-songs')}>
                        <table className={cx('playlist-table')}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th style={{ textAlign: 'left' }}>Tiêu đề</th>
                                    <th>Album</th>
                                    <th>Ngày phát hành</th>
                                    <th>Thời lượng</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td style={{ textAlign: 'left' }}>1</td>
                                    <td>
                                        <div className={cx('wrapper-info')}>
                                            <div className={cx('song-image')}>
                                                <Image
                                                    className={cx('image2')}
                                                    src="/images/img1.jpg"
                                                    alt=""
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <div className={cx('song-name-artist')}>
                                                <div className={cx('song-name')}>abc</div>
                                                <div className={cx('song-artist')}>Son Tung MTP</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ textAlign: 'center' }}>Tuổi trẻ</div>
                                    </td>
                                    <td>
                                        {' '}
                                        <div style={{ textAlign: 'center' }}>20.07.2023</div>
                                    </td>
                                    <td>
                                        {' '}
                                        <div style={{ textAlign: 'center' }}>4:00</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
                {activeTab === 'tab2' && (
                    <div className={cx('main-album')}>
                        <div className={cx('album-image')}>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'tab3' && (
                    <div className={cx('main-album')}>
                        <div className={cx('album-image')}>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                            <div className={cx('album-image-1')}>
                                <Image
                                    className={cx('image5')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={200}
                                    height={200}
                                />
                                <span>99%</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
