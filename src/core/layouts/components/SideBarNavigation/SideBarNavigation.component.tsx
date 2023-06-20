import classNames from 'classnames/bind';

import styles from './SideBarNavigation.module.scss';

const cx = classNames.bind(styles);

function SideBarNavigation() {
    return (
        <div className={cx('sidebar-navigation')}>
            <h2>Sidebar Navigation Components</h2>
        </div>
    );
}

export default SideBarNavigation;
