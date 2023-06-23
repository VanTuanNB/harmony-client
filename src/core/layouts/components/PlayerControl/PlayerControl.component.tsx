import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';

const cx = classNames.bind(styles);

function PlayerControl() {
    return (
        <div className={cx('player-control')}>
            <div className={cx('song-bar')}>
                <div className={cx('song-infors')}>
                    <div className={cx('image-container')}>
                        <Image className={cx('image1')} src="/images/img1.jpg" alt="" width={60} height={60} />
                    </div>
                    <div className={cx('song-description')}>
                        <p className={cx('title')}>Một phút</p>
                        <p className={cx('artist')}>Tiến Bách</p>
                    </div>
                </div>
                <div className={cx('icons')}>
                    <i className={cx(styles.icon, 'far', 'fa-heart')}></i>
                    <i className={cx(styles.icon, 'fas', 'fa-compress')}></i>
                </div>
            </div>
            <div className={cx('progress-controller')}>
                <div className={cx('control-buttons')}>
                    <i className={cx(styles.icon, 'fas', 'fa-random')}></i>
                    <i className={cx(styles.icon, 'fa', 'fa-step-backward')}></i>
                    <i className={cx(styles['play-pause'], 'fas', 'fa-play')}></i>
                    <i className={cx(styles.icon, 'fas', 'fa-step-forward')}></i>
                    <i className={cx(styles.icon, 'fas', 'fa-undo-alt')}></i>
                </div>

                <div className={cx('progress-container')}>
                    <span>0:49</span>
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress')}></div>
                    </div>
                    <span>3:15</span>
                </div>
            </div>
            <div className={cx('other-features')}>
                <i className={cx(styles.icon, 'fas', 'fa-list-ul')}></i>
                <i className={cx(styles.icon, 'fas', 'fa-desktop')}></i>
                <div className={cx('volume-bar')}>
                    <i className={cx(styles.icon, 'fas', 'fa-volume-down')}></i>
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress-inner')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerControl;
