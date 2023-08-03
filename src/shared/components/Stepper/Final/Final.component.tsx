import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Final.module.scss';

const cx = classNames.bind(styles);

function FinalComponent() {
    const [isLoaded, setIsLoaded] = useState(false);
    const loadTime = 2000; // Thời gian chạy của animation (tính bằng mili giây)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, loadTime);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cx('final')}>
            {!isLoaded && <div className={cx('loader')}></div>}
            {isLoaded && (
                <>
                    <div className={cx('check')}>
                        <svg
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 98.5 98.5"
                            enable-background="new 0 0 98.5 98.5"
                            xmlSpace="preserve"
                        >
                            <path
                                className={cx('checkmark')}
                                fill="none"
                                stroke-width="8"
                                stroke-miterlimit="10"
                                d="M81.7,17.8C73.5,9.3,62,4,49.2,4
                C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"
                            />
                        </svg>
                    </div>
                    <h2>Tải bài hát lên thành công</h2>
                </>
            )}
        </div>
    );
}

export default FinalComponent;
