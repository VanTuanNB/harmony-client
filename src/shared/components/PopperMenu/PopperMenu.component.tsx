import { ReactElement, ReactNode, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

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
    position?: {
        top?: number;
        right?: number;
        left?: number;
        bottom?: number;
    };
}

function PopperMenuComponent({ children, listOptions, isHideOutSide = true, position }: IPopperMenu): ReactNode {
    const [history, setHistory] = useState<{ data: IPopperListOptions[]; title: string }[]>([
        { data: listOptions, title: '' },
    ]);
    const current = history[history.length - 1];
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

            return (
                <MenuItem
                    key={index}
                    dataOption={item}
                    onClick={() => {
                        if (isParent && !!item.children && item.children.data.length > 0) {
                            setHistory((prevState) => [...prevState, { data: item.children!.data, title: item.title }]);
                        } else {
                            setHistory((prevState) => [...prevState]);
                        }
                    }}
                />
            );
        });
    };

    const handleBack = () => {
        setHistory((prev) => prev.slice(0, prev.length - 1));
    };

    const hashmapPosition = (position: { top?: number; right?: number; bottom?: number; left?: number }) => {
        const reducePosition = Object.keys(position).reduce((acc: { [key: string]: string }, cur: string) => {
            if (position[cur as keyof typeof position] === undefined) return acc;
            acc[cur] = `${position[cur as keyof typeof position]}px`;
            return acc;
        }, {});
        return reducePosition;
    };

    const renderResult = (attrs: any) => (
        <div className={cx('menu-list')} tabIndex="-1" style={hashmapPosition(position ?? {})} {...attrs}>
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
        <div className={cx('relativeElement')} onClick={() => setIsVisible(true)}>
            <Tippy
                interactive
                visible={isVisible}
                placement="bottom-end"
                render={renderResult}
                onHide={handleReset}
                onClickOutside={() => setIsVisible(false)}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperMenuComponent;
