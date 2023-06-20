import classNames from 'classnames/bind';
import styles from './PlayerControl.module.scss';

const cx = classNames.bind(styles);

function PlayerControl() {
    return (
        <div className={cx('player-control')}>
            <h1>Player Control Component</h1>
        </div>
    );
}

export default PlayerControl;
