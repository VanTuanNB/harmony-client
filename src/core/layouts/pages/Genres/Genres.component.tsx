'use client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Genres.module.scss';
const cx = classNames.bind(styles);

function GenresPage() {
    return (
        <div className={cx('genres')}>
            <div className={cx('genres-title')}>
                <h2>Duyệt tìm tất cả</h2>
            </div>
            <div className={cx('genres-content')}>
                <Link href={''} className={cx('genres-content-1')}>
                    <div className={cx('genres-image')}>
                        <Image className={cx('image5')} src={'/images/ballad.png'} alt="" width={500} height={500} />
                    </div>
                </Link>
                <Link href={''} className={cx('genres-content-1')}>
                    <div className={cx('genres-image')}>
                        <Image className={cx('image5')} src={'/images/rap.png'} alt="" width={500} height={500} />
                    </div>
                </Link>
                <Link href={''} className={cx('genres-content-1')}>
                    <div className={cx('genres-image')}>
                        <Image className={cx('image5')} src={'/images/usuk.png'} alt="" width={500} height={500} />
                    </div>
                </Link>
                <Link href={''} className={cx('genres-content-1')}>
                    <div className={cx('genres-image')}>
                        <Image className={cx('image5')} src={'/images/rock.png'} alt="" width={500} height={500} />
                    </div>
                </Link>
            </div>
        </div>
    );
}
export default GenresPage;
