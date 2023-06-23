import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import styles from './PopperMenu.module.scss';

const cx = classNames.bind(styles);

function Wrapper({ children, className }: { children: ReactNode | string; className: string }): ReactNode {
    return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
