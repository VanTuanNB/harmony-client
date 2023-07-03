import classNames from 'classnames/bind';

import styles from './SideBarNavigation.module.scss';

const cx = classNames.bind(styles);

function SideBarNavigation() {
    return (
        <div className={cx('sidebar-navigation')}>
            <div className={cx('left-sidebar')}>
                <h2>Sidebar Navigation Components</h2>
            </div>
        </div>
    );
}

export default SideBarNavigation;
