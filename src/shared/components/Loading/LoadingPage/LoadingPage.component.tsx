import classNames from 'classnames/bind';
import styles from './LoadingPage.module.scss';
const cx = classNames.bind(styles);

function LoadingPage() {
    return (
        <div className={cx('wrapper-loading')}>
            <div className={cx('overlay')}></div>
            <div className={cx('content')}>
                <div className={cx('loader')}></div>
            </div>
        </div>
    );
}

export default LoadingPage;
