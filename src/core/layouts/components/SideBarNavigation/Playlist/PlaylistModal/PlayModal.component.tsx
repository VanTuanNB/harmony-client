import classNames from 'classnames/bind';
import styles from './PlaylistModal.module.scss';

const cx = classNames.bind(styles);

function PlaylistModal() {
    return (
        <div className={cx('wrapper-modal')}>
            <div className={cx('overlay')}></div>
            <div className={cx('contents')}>do some thing</div>
        </div>
    );
}

export default PlaylistModal;
