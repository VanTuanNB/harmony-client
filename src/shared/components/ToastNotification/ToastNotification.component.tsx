import { useState } from 'react';

import styles from './ToastNotification.module.scss';
import Toast from './Toast/Toast.component';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function ToastNotification() {
    return (
        <div className={cx(styles.container, styles['top-right'])}>
            <Toast state="warning" title="SUCCESS" message="do something" />
        </div>
    );
}

export default ToastNotification;
