import { useGetServiceGenreTopQuery } from '@/core/redux/services/genre.service';
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

function GenreHotComponent() {
    const apiGenreTop = useGetServiceGenreTopQuery('4');
    return (
        <div className={cx('main-hot')}>
            <h3>Thể loại phổ biến nhất</h3>
            {apiGenreTop.isLoading && <SkeletonLoading count={3} />}
            <div className={cx('hot-image')}>
                {apiGenreTop.data?.data.map((genre) => (
                    <Link href={'/genres/' + genre._id} key={genre._id} className={cx('hot-image-1')}>
                        <div className={cx('image-album')}>
                            {genre.thumbnailUrl && (
                                <Image
                                    className={cx('image5')}
                                    src={'/images/genres/' + genre.thumbnailUrl}
                                    alt=""
                                    width={500}
                                    height={500}
                                />
                            )}
                            {genre.thumbnailUrl === null && <AlbumIcon className={cx('icon-album')} />}
                        </div>
                        <h2>{genre.title}</h2>
                    </Link>
                ))}
            </div>
            {apiGenreTop.error && (
                <div className={cx('wrapper-disconnect-network')}>
                    <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                    <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                </div>
            )}
        </div>
    );
}

export default memo(GenreHotComponent);
