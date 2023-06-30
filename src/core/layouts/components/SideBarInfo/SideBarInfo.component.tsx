import classNames from 'classnames/bind';

import styles from './SideBarInfo.module.scss';
import PlaylistComponent from '@/shared/components/Playlist/Playlist.component';
import SuggestComponent from '@/shared/components/Suggest/Suggest.component';

const cx = classNames.bind(styles);

function SideBarInfo() {
    return (
        <div className={cx('sidebar-info')}>
            <PlaylistComponent />
            <SuggestComponent />
        </div>
    );
}

export default SideBarInfo;
