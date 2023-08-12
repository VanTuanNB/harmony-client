import React, { useEffect, useCallback, useState } from 'react';
import styles from './Toast.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimes, faWarning, faXmark } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
// Định nghĩa kiểu dữ liệu cho toastlisti
interface IToastProps {
    state: 'success' | 'warning' | 'error';
    title: string;
    message: string;
    placement?: 'right' | 'top';
}

const Toast: React.FC<IToastProps> = ({ state, title, message, placement = 'right' }) => {
    const [show, setShow] = useState<boolean>(true);

    const handleClose = () => {
        setShow(false);
    };

    useEffect(() => {}, []);

    return (
        <>
            {show && (
                <div className={cx('wrapper-toast', `${state}`, `placement-${placement}`)}>
                    <div className={cx('box-left')}>
                        {state === 'success' && <FontAwesomeIcon icon={faCheckCircle} />}
                        {state === 'warning' && <FontAwesomeIcon icon={faWarning} />}
                        {state === 'error' && <FontAwesomeIcon icon={faXmark} />}
                    </div>
                    <div className={cx('box-right')}>
                        <div className={cx('title')}>{title}</div>
                        <div className={cx('message')}>{message}</div>
                    </div>
                    <div className={cx('close-icon')} onClick={handleClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Toast;
