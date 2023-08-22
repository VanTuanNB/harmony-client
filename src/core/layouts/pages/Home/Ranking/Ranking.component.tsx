import classNames from 'classnames/bind';

import { ISong } from '@/core/common/interfaces/collection.interface';
import { useGetServiceSongsViewTopQuery } from '@/core/redux/services/song.service';
import SkeletonLoading from '@/shared/components/Loading/Skeleton/SkeletonLoading.component';
import { formatDate } from '@/utils/format.util';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Rankking.module.scss';

const cx = classNames.bind(styles);
interface IProps {
    onClick: (data: ISong) => void;
}
function RankingComponent({ onClick }: IProps) {
    const apiSongTopView = useGetServiceSongsViewTopQuery('3');
    return (
        <div className={cx('main-ranking')}>
            <h3>Top bài hát nghe nhiều nhất</h3>
            {apiSongTopView.isLoading && <SkeletonLoading count={3} />}
            <div className={cx('list-rank')}>
                {apiSongTopView.data?.data.map((song, index) => (
                    <div onClick={() => onClick(song)} key={song._id} className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src={song.thumbnailUrl} alt="" width={300} height={300} />
                        </div>
                        <div className={cx('songsinger-main')}>
                            <div className={cx('songsinger-ranking')}>
                                <span className={cx('song')}>{song.title}</span>
                                {song.performers.map((user) => (
                                    <Link key={user._id} href={'/composer/@' + user.nickname} className={cx('singer')}>
                                        {user.name}
                                    </Link>
                                ))}
                            </div>
                            <div className={cx('rankingdate-main')}>
                                <div className={cx('ranking', 'rank'+index)}>
                                    <span>#{index + 1}</span>
                                </div>
                                <div className={cx('date')}>
                                    <span>{formatDate(song.publish)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {apiSongTopView.error && (
                <div className={cx('wrapper-disconnect-network')}>
                    <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                    <span className={cx('disconnect-network-title')}> Bạn đã mất kết nối internet...</span>
                </div>
            )}
        </div>
    );
}

export default RankingComponent;
