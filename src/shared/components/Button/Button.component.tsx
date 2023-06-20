import classnames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classnames.bind(styles);

export default function Button() {
    return <button className={cx('test')}>Do Something</button>;
}
