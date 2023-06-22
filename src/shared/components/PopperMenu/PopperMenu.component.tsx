import { ReactElement, ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';

import styles from './PopperMenu.module.scss';
import { IPopperListOptions } from '@/shared/interfaces/IPopperListOptions.interface';
import MenuItem from './MenuItem.component';
import Wrapper from './Wrapper.component';
import HeaderPopper from './HeaderPopper.component';

const cx = classNames.bind(styles);

interface IPopperMenu {
    children: ReactElement;
    listOptions: IPopperListOptions[];
    isHideOutSide?: boolean;
    onChange?: () => void;
}

function PopperMenuComponent({ children, listOptions, isHideOutSide = false, onChange }: IPopperMenu): ReactNode {
    const [history, setHistory] = useState<{ data: IPopperListOptions[]; title: string }[]>([
        { data: listOptions, title: '' },
    ]);
    const current = history[history.length - 1];
    console.log('history state: ', history);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    dataOption={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => {
                                if (item.children && item.children.data.length > 0) {
                                    return [...prev, { data: item.children.data, title: item.title }];
                                } else {
                                    return [...prev];
                                }
                            });
                        } else {
                            // onChange(item);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const renderResult = (attrs: any) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper className={cx('menu-popper')}>
                {history.length > 1 && <HeaderPopper title={current.title} onBack={handleBack} />}
                <div className={cx('menu-body')}>{renderItems()}</div>
            </Wrapper>
        </div>
    );

    // Reset to first page
    const handleReset = () => {
        setHistory((prev) => prev.slice(0, 1));
    };
    return (
        <Tippy
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            hideOnClick={isHideOutSide}
            placement="bottom-end"
            render={renderResult}
            onHide={handleReset}
        >
            {children}
        </Tippy>
    );
}

export default PopperMenuComponent;
