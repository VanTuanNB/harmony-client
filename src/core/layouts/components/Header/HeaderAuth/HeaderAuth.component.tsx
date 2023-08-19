import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './HeaderAuth.module.scss';
const cx = classNames.bind(styles);
function HeaderAuth() {
    return (
        <div className={cx('wrapper-login')}>
            <Link href={'/auth/login'} className={cx('link-login')}>
                Đăng nhập
            </Link>
        </div>
    );
}

export default HeaderAuth;
