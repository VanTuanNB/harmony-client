import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Link from 'next/link';
import { FacebookIcon, GoogleIcon } from '@/shared/components/Svg/index.component';

const cx = classNames.bind(styles);

function LoginPage() {
    return (
        <div className={cx('form')}>
            <div className={cx('form-top')}>
                <h2>Login to Harmony</h2>
                <Link href="">
                    <FacebookIcon width="30px" height="30px" className={cx('icon-facebook')} fill="none" />
                    <p> Continne with Facebook</p>
                </Link>
                <Link href="">
                    <GoogleIcon width="30px" height="30px" className={cx('icon-facebook')} fill="none" />
                    <p> Continne with Google</p>
                </Link>
            </div>
            <hr />
            <form action="" className={cx('login-form')}>
                <input type="text" placeholder="Email" />
                <br />
                <input type="text" placeholder="Password" />
                <br />
                <p>
                    <input type="checkbox" /> <span>Remember me</span>
                </p>
                <button>Log in</button>
            </form>
            <Link href="" className={cx('forgot')}>
                Forgot your password?
            </Link>
            <hr />
            <p>
                Don't have an account? <Link href="">Sign up Harmony for free</Link>
            </p>
        </div>
    );
}

export default LoginPage;
