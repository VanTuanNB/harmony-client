'use client';
import classNames from 'classnames/bind';
import style from './Composer.module.scss';
import Image from 'next/image';

const cx = classNames.bind(style);

function HistoryPage() {
    return (
        <><div className={cx('main-history')}>
            <div className={cx('title')}>Phat Gan Day</div>
            <ul className={cx('menu-bar')}>
                <li className={cx('menu')}>BÀI HÁT</li>
                <li className={cx('menu')}>PLAYLIST</li>
                <li className={cx('menu')}>MV</li>
                <li className={cx('menu')}>RADIO</li>
                <li className={cx('menu')}>PODCAST</li>
            </ul>
            </div>
            <div className={cx('content-history')}>
                <div className={cx('content')}>
                    <Image className={cx('song-thumnail')} src="/images/img1.jpg" alt="" width={100} height={100} />
                    <div className={cx('song-name')}>Song Name</div>
                    <div className={cx('album-name')}>Album Name</div>
                    <div className={cx('duration')}>04:44</div>
                </div>
            </div>
        </>
    )
}
export default HistoryPage;