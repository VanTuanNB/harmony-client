import { faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import PlaylistModal from '../PlaylistModal/PlayModal.component';
import styles from './PlaylistSymlink.module.scss';

const cx = classNames.bind(styles);

export default function PlaylistSymlinkComponent() {
    const [isShowPopup, setIsShowPopup] = useState<boolean>(false);
    const handleShowPopupAddPlaylist = useCallback(() => {
        console.log('current state', isShowPopup);
        setIsShowPopup((prevState) => !prevState);
    }, [isShowPopup]);
    return (
        <>
            <div className={cx('right-slide')}>
                <div className={cx('main-container')}>
                    <div className={cx('main-header')}>
                        <div className={cx('header-menu')}>
                            <a href="#" className={cx('main-header-link')}>
                                Playlists
                            </a>
                        </div>
                    </div>
                </div>
                <div className={cx('search-sidebar')}>
                    <div className={cx('container')}>
                        <input placeholder="Type to search..." className={cx('input')} name="text" type="text" />
                        <div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
                        </div>
                    </div>
                    <button className={cx('btn-add-playlist')} onClick={handleShowPopupAddPlaylist}>
                        <FontAwesomeIcon icon={faPlus} className={cx('icon1')} />
                    </button>
                </div>
                <div className={cx('album-render')}>
                    <div className={cx('list-songs')}>
                        <div className={cx('single-song')}>
                            <div id={cx('song')}>
                                <Image src={'/'} alt={''} width={40} height={40}></Image>
                                <div id={cx('song-title')}>
                                    <div id={cx('title')}>Chúng ta của hiện tại</div>
                                    <div id={cx('author')}>Sơn Tùng MTP</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isShowPopup && <PlaylistModal></PlaylistModal>}
        </>
    );
}
