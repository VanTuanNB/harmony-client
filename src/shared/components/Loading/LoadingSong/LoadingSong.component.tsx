import classNames from 'classnames/bind';

import styles from './LoadingSong.module.scss';

const cx = classNames.bind(styles);

interface ILoadingSongProps {
    width?: number;
    subHeight?: number;
    primaryHeight?: number;
}

function LoadingSong({ width = 3, subHeight = 20, primaryHeight = 35 }: ILoadingSongProps) {
    return (
        <div className={cx('loader')}>
            <span style={{ height: `${subHeight}px`, width: `${width}px` }} className={cx('bar')}></span>
            <span style={{ height: `${primaryHeight}px`, width: `${width}px` }} className={cx('bar')}></span>
            <span style={{ height: `${subHeight}px`, width: `${width}px` }} className={cx('bar')}></span>
        </div>
    );
}

export default LoadingSong;
