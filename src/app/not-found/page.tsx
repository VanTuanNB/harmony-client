import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import styles from './not-found.module.scss';
const cx = classNames.bind(styles);
function PageNotFound() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-img')}>
                <Image src="/images/404thumbnail.png" width={100} height={100} alt="" />
            </div>
            <div className={cx('wrapper-actions')}>
                <Link href={'/'} className={cx('btn-link')}>
                    Trang chủ
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;
