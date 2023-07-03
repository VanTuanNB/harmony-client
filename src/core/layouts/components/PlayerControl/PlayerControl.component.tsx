import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackwardStep,
    faBars,
    faCompress,
    faForwardStep,
    faMicrophoneLines,
    faPlay,
    faRetweet,
    faShuffle,
    faVolumeDown,
} from '@fortawesome/free-solid-svg-icons';
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
                        <p className={cx('title')}>Đời là thế thôi</p>
                        <p className={cx('artist')}>Phú Lê</p>
                    </div>
                </div>
                <div className={cx('icons')}>
                    <FontAwesomeIcon icon={faHeart} className={cx('icon')} />
                    <FontAwesomeIcon icon={faCompress} className={cx('icon')} />
                </div>
            </div>
            <div className={cx('progress-controller')}>
                <div className={cx('control-buttons')}>
                    <FontAwesomeIcon icon={faShuffle} className={cx('icon')} />
                    <FontAwesomeIcon icon={faBackwardStep} className={cx('icon')} />
                    <FontAwesomeIcon icon={faPlay} className={cx('play-pause')} />
                    <FontAwesomeIcon icon={faForwardStep} className={cx('icon')} />
                    <FontAwesomeIcon icon={faRetweet} className={cx('icon')} />
                </div>
                {/* thanh am nhac */}
                <div className={cx('progress-container')}>
                    <span>0:49</span>
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress')}></div>
                    </div>
                    <span>3:15</span>
                </div>
            </div>
            <div className={cx('other-features')}>
                <FontAwesomeIcon icon={faMicrophoneLines} className={cx('icon')} />
                <FontAwesomeIcon icon={faBars} className={cx('icon')} />
                <div className={cx('volume-bar')}>
                    <FontAwesomeIcon icon={faVolumeDown} className={cx('icon')} />
                    <div className={cx('progress-bar')}>
                        <div className={cx('progress-inner')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlayerControl;
