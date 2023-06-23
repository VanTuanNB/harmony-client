import classNames from 'classnames/bind';

import styles from './PopperMenu.module.scss';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import Button from '@/shared/components/Button/Button.component';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface IMenuItem {
    dataOption: IPopperListOptions;
    onClick: (e: MouseEvent) => void;
}

function MenuItem({ dataOption, onClick }: IMenuItem) {
    const classes = cx('menu-item', {
        separate: dataOption.separate,
    });
    return (
        <Button
            className={classes}
            leftIcon={dataOption.icon}
            rightIcon={dataOption.children ? faAngleRight : undefined}
            href={dataOption.href}
            hrefLang={dataOption.hrefLang}
            onClick={onClick}
        >
            {dataOption.title}
        </Button>
    );
}

export default MenuItem;
