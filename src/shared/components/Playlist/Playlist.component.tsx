import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import PrevListeningComponent from './PrevListening.component';
import NextListeningComponent from './NextListening.component';

const cx = classNames.bind(styles);

function PlaylistComponent(): ReactNode {
    return (
        <div className={cx('wrapper')}>
            <PrevListeningComponent />
            <NextListeningComponent />
        </div>
    );
}

export default PlaylistComponent;
