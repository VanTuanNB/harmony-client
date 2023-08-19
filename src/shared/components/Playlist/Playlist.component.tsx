import { ReactNode } from 'react';

import classNames from 'classnames/bind';
import styles from './Playlist.module.scss';
import NextListeningComponent from './NextListening.component';
import PlayingComponent from './Playing.component';

const cx = classNames.bind(styles);

function PlaylistComponent(): ReactNode {
    return (
        <div className={cx('wrapper')}>
            <PlayingComponent />
            <NextListeningComponent />
        </div>
    );
}

export default PlaylistComponent;
