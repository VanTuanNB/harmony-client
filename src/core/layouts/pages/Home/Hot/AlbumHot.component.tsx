import { useGetServiceAlbumNewWeekQuery } from '@/core/redux/services/album.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { AlbumIcon } from '@/shared/components/Svg/index.component';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import styles from './Hot.module.scss';
const cx = classNames.bind(styles);

function AlbumHotComponent() {
    const apiAlbumNewWeek = useGetServiceAlbumNewWeekQuery('4');
    return (
        <div className={cx('main-hot')}>
            <h3>Hot Album</h3>
            {apiAlbumNewWeek.isLoading && <SkeletonLoading count={3} />}
            <div className={cx('hot-image')}>
                {apiAlbumNewWeek.data?.data.map((item) => (
                    <Link href={'/album/' + item._id} key={item._id} className={cx('hot-image-1')}>
                        <div className={cx('image-album')}>
                            {item.thumbnailUrl && (
                                <Image
                                    className={cx('image5')}
                                    src={item.thumbnailUrl}
                                    alt=""
                                    width={500}
                                    height={500}
                                />
                            )}
                            {item.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                        </div>
                        <h2>{item.title}</h2>
                        <span>{item.userReference.name}</span>
                    </Link>
                ))}
            </div>
            {apiAlbumNewWeek.error && (
                <div className={cx('wrapper-disconnect-network')}>
                    <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                    <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                </div>
            )}
        </div>
    );
}

export default memo(AlbumHotComponent);
