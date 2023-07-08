import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const cx = classNames.bind(styles);

function LoginPage() {
    return (
        <div className={cx('form')}>
            <div className={cx('form-top')}>
                <h2>Login to Harmony</h2>
                <Link href="">
                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-facebook')} />
                    Continne with Facebook
                </Link>
                <Link href="">
                    <FontAwesomeIcon icon={faGoogle} className={cx('icon-facebook')} />
                    Continne with Google
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
