import classNames from 'classnames/bind';

import { ISong } from '@/core/common/interfaces/collection.interface';
import {
    useGetServiceSongsJustReleasedQuery,
    useGetServiceSongsViewTopQuery,
} from '@/core/redux/services/song.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import MediaItemInPage from '@/shared/components/MediaItemInPage/MediaItemInPage.component';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import styles from './Release.module.scss';

const cx = classNames.bind(styles);

interface IProps {
    onClick: (data: ISong) => void;
}

function ReleaseComponent({ onClick }: IProps) {
    const apiJustReleased = useGetServiceSongsJustReleasedQuery('6');
    const apiSongTop = useGetServiceSongsViewTopQuery('6');
    return (
        <div className={cx('main-just')}>
            <h3 className={cx('title')}>Bài hát vừa phát hành</h3>
            {apiJustReleased.isLoading && <SkeletonLoading count={3} />}
            <ul className={cx('list-listening')}>
                {apiJustReleased.data?.data.map((song: ISong) => (
                    <li key={song._id}>
                        <MediaItemInPage data={song} onClick={onClick} />
                    </li>
                ))}
            </ul>
            {apiJustReleased.error && (
                <div className={cx('wrapper-disconnect-network')}>
                    <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                    <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                </div>
            )}
            <h3 className={cx('title')}>Bài hát thịnh hành</h3>
            {apiSongTop.isLoading && <SkeletonLoading count={3} />}
            <ul className={cx('list-listening')}>
                {apiSongTop.data?.data.map((song: ISong) => {
                    return (
                        <li key={song._id}>
                            <MediaItemInPage data={song} onClick={onClick} />
                        </li>
                    );
                })}
            </ul>
            {apiSongTop.error && (
                <div className={cx('wrapper-disconnect-network')}>
                    <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                    <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                </div>
            )}
        </div>
    );
}

export default memo(ReleaseComponent);
