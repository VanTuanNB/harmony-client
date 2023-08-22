'use client';
import { useGetServiceGenreQuery } from '@/core/redux/services/genre.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import styles from './Genres.module.scss';
const cx = classNames.bind(styles);

function GenresPage() {
    const { data, isLoading } = useGetServiceGenreQuery();
    return (
        <div className={cx('genres')}>
            <div className={cx('genres-title')}>
                <h2>Chủ đề & thể loại</h2>
            </div>
            <div className={cx('genres-content')}>
                {isLoading && <SkeletonLoading count={20} />}
                {data?.data.map((item, index) => (
                    <Link href={'/genres/' + item._id} key={index} className={cx('genres-content-1')}>
                        <div className={cx('genres-image')}>
                            <Image
                                className={cx('image5')}
                                src={'/images/genres/' + item.thumbnailUrl}
                                alt=""
                                width={500}
                                height={500}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
export default memo(GenresPage);
