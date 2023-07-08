import classNames from 'classnames/bind';
import styles from './Signup.module.scss';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function SignupPage() {
    return (
        <div className={cx('form')}>
            <div className={cx('form-top')}>
                <h2>Sign up Harmony for free</h2>
                <a href="">
                    <FontAwesomeIcon icon={faFacebook} className={cx('icon-facebook')} />
                    Continne with Facebook
                </a>
                <a href="">
                    <FontAwesomeIcon icon={faGoogle} className={cx('icon-facebook')} />
                    Continne with Google
                </a>
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
                <span>By clicking on sign-up, you agree to Harmony's Terms and Conditions of Use.</span><br />
                <span>
                    To learn more about how Devify collects, uses, shares and protects your personal data, please see
                    Harmony's Privacy Policy.
                </span>
                <button>Sign up</button>
            </form>
            <hr />
            <p>
                Already have an account? <a href="">Log in now</a>
            </p>
        </div>
    );
}

export default SignupPage;
