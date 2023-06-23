import classnames from 'classnames/bind';

import styles from './Button.module.scss';
import { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classnames.bind(styles);

interface IButton {
    href?: string;
    hrefLang?: string;
    primary?: boolean;
    outline?: boolean;
    text?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    small?: boolean;
    large?: boolean;
    children?: ReactNode | string;
    className?: string;
    leftIcon?: IconProp;
    rightIcon?: IconProp;
    onClick: (e: any) => void;
}

function Button({
    href,
    hrefLang,
    primary = false,
    outline = false,
    text = false,
    rounded = false,
    disabled = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...args
}: IButton) {
    let Comp: any = 'button';
    const props: { onClick: (e: any) => void; [key: string]: any } = {
        onClick,
        ...args,
    };

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key: string) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (href) {
        props.href = href;
        Comp = Link;
    } else if (hrefLang) {
        props.hrefLang = hrefLang;
        Comp = Link;
    }

    const classes = cx('wrapper', {
        [className ?? '']: className ?? '',
        primary,
        outline,
        text,
        disabled,
        rounded,
        small,
        large,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{<FontAwesomeIcon icon={leftIcon} />}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{<FontAwesomeIcon icon={rightIcon} />}</span>}
        </Comp>
    );
}

export default Button;
