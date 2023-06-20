import classNames from 'classnames/bind';

import styles from './SideBarInfo.module.scss';

const cx = classNames.bind(styles);

function SideBarInfo() {
    return (
        <div className={cx('sidebar-info')}>
            <h2>Sidebar Info Components</h2>
        </div>
    );
}

export default SideBarInfo;
