import classnames from 'classnames/bind';

import styles from './Button.module.scss';
import React from 'react';

const cx = classnames.bind(styles);

export default function Button(props:any) {
    const {children, style, onCLick} = props;
    return <button className={cx('test')} style={style ? style :{background: 'red', color: '#000'}} onClick = {onClick}>{children}</button>;
}

