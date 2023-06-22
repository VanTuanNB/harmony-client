import classNames from 'classnames/bind';

import styles from './PopperMenu.module.scss';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import Button from '@/shared/components/Button/Button.component';

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
        <Button className={classes} leftIcon={dataOption.icon} href={dataOption.href} onClick={onClick}>
            {dataOption.title}
        </Button>
    );
}

export default MenuItem;
