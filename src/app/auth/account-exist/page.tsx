import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import styles from './accountExist.module.scss';
const cx = classNames.bind(styles);

function AccountExistRouting() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper-img')}>
                <Image src="/images/404thumbnail.png" width={300} height={300} alt="" />
            </div>
            <div className={cx('hint')}>
                Tài khoản này bạn đã đăng ký trước đó rồi, hãy thử đăng nhập với hình thức biểu mẫu
            </div>
            <div className={cx('wrapper-actions')}>
                <Link href={'/auth/login'} className={cx('btn-link')}>
                    Đăng nhập
                </Link>
            </div>
        </div>
    );
}

export default AccountExistRouting;
