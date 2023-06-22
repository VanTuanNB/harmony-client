import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';

const cx = classNames.bind(styles);

function PlayerControl() {
    return (
        <div className={cx('player-control')}>
            <div className={cx('songBar')}>
                <div className={cx('songInfors')}>
                    <div className={cx('imageContainer')}>
                        <Image className={cx('image1')} src="" alt="" width={0} height={0} />
                    </div>
                    <div className={cx('songDescription')}>
                        <p className={cx('title')}>Một phút</p>
                        <p className={cx('artist')}>Tiến Bách</p>
                    </div>
                </div>
                <div className={cx('icons')}>
                    <i className={cx(' far fa-heart')}></i>
                    <i className={cx(' fas fa-compress')}></i>
                </div>
            </div>
            <div className={cx('progressController')}>
                <div className={cx('controlButtons')}>
                    <i className={cx('fas fa-random')}></i>
                    <i className={cx('fa fa-step-backward')}></i>
                    <i className={cx('play-pause fas fa-play')}></i>
                    <i className={cx('fas fa-step-forward')}></i>
                    <i className={cx('fas fa-undo-alt')}></i>
                </div>
                <div className={cx('progressContainer')}>
                    <span>0:49</span>
                    <div className={cx('progressBar')}>
                        <div className={cx('progress')}></div>
                    </div>
                    <span>3:15</span>
                </div>
            </div>
            <div className={cx('otherFeatures')}>
                <i className={cx('fas fa-list-ul')}></i>
                <i className={cx('fas fa-desktop')}></i>
                <div className={cx('volumeBar')}>
                    <i className={cx('fas fa-volume-down')}></i>
                    <div className={cx('progressBar')}>
                        <div className={cx('progress')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerControl;
