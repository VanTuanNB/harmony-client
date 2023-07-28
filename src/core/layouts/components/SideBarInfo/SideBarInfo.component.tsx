import classNames from 'classnames/bind';

import styles from './SideBarInfo.module.scss';
import PlaylistComponent from '@/shared/components/Playlist/Playlist.component';
import SuggestComponent from '@/shared/components/Suggest/Suggest.component';

const cx = classNames.bind(styles);

function SideBarInfo() {
    return (
        <div className={cx('sidebar-info')}>
            <div className={cx('right-sidebar')}>
                <PlaylistComponent />
                <SuggestComponent />
            </div>
        </div>
    );
}

export default SideBarInfo;
