import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import { FacebookIcon, GoogleIcon } from '@/shared/components/Svg/index.component';

const cx = classNames.bind(styles);

function SignupPage() {
    return (
        <div className={cx('form')}>
            <div className={cx('form-top')}>
                <h2>Sign up Harmony for free</h2>
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
                <input type="text" placeholder="Full Name" />
                <br />
                <input type="password" placeholder="Password" />
                <br />
                <input type="password" placeholder="Confirm Password" />
                <br />
                <div className={cx('terms')}>
                    <p>By clicking on sign-up, you agree to Harmony's Terms and Conditions of Use.</p>
                    <p>
                        To learn more about how Devify collects, uses, shares and protects your personal data, please
                        see Harmony's Privacy Policy.
                    </p>
                </div>
                <button>Sign up</button>
            </form>
            <hr />
            <p>
                Already have an account?{' '}
                <Link href="">
                    <i>Log in now</i>
                </Link>
            </p>
        </div>
    );
}

export default SignupPage;
