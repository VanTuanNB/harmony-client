import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import {
    faBackward,
    faCompress,
    faDesktop,
    faForward,
    faListUl,
    faPlay,
    faShuffle,
    faUndoAlt,
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
                        <p className={cx('title')}>Một phút</p>
                        <p className={cx('artist')}>Tiến Bách</p>
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
                    <FontAwesomeIcon icon={faBackward} className={cx('icon')} />
                    <FontAwesomeIcon icon={faPlay} className={cx('play-pause')} />
                    <FontAwesomeIcon icon={faForward} className={cx('icon')} />
                    <FontAwesomeIcon icon={faUndoAlt} className={cx('icon')} />
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
                <FontAwesomeIcon icon={faListUl} className={cx('icon')} />
                <FontAwesomeIcon icon={faDesktop} className={cx('icon')} />
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
