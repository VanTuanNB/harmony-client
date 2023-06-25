'use client';
import classNames from 'classnames/bind';
import styles from './ButtonSwitchTheme.module.scss';
import { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { EDataTheme } from '@/core/common/constants/reduxSlice.constant';
import { useAppDispatch } from '@/core/redux/hook.redux';
import { changeGlobalThemes } from '@/core/redux/features/client/client.slice';
import { LocalStorageSide } from '@/utils/clientStore.util';
import { ELocalStorageKey } from '@/core/common/constants/common.constant';

const cx = classNames.bind(styles);

function ButtonSwitchTheme(): ReactNode {
    const localStoreInstance = new LocalStorageSide();
    const [theme, setTheme] = useState<EDataTheme>(
        (localStoreInstance.getStore(ELocalStorageKey.DATA_THEME) as EDataTheme.LIGHT & EDataTheme.DARK) ??
            EDataTheme.DARK,
    );
    const dispatch = useAppDispatch();
    function handleSwitchTheme() {
        setTheme((prevState: EDataTheme) => (prevState === EDataTheme.DARK ? EDataTheme.LIGHT : EDataTheme.DARK));
    }
    useEffect(() => {
        dispatch(changeGlobalThemes({ theme }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);
    return (
        <div className={cx('wrapper-btn-theme')} onClick={handleSwitchTheme}>
            <div className={cx('box', theme === EDataTheme.DARK ? 'moon' : 'sun')}>
                <FontAwesomeIcon icon={theme === EDataTheme.DARK ? faMoon : faSun} className={cx('theme-icon')} />
            </div>
        </div>
    );
}

export default ButtonSwitchTheme;
