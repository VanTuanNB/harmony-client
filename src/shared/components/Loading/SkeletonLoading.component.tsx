import classNames from 'classnames/bind';
import styles from './Skeleton.module.scss';
const cx = classNames.bind(styles);

interface ISkeletonLoadingProps {
    count: number;
}

function SkeletonLoading({ count }: ISkeletonLoadingProps) {
    return (
        <>
            {new Array(count).fill(0).map((cur, index) => (
                <div key={index} className={cx('loading')}>
                    <div className={cx('content')}>
                        <div className={cx('background')}>
                            <div className={cx('animation')}></div>
                        </div>
                        <div className={cx('information')}>
                            <div className={cx('title')}>
                                <div className={cx('animation')}></div>
                            </div>
                            <div className={cx('channel')}>
                                <div className={cx('animation')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}

export default SkeletonLoading;
