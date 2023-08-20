import { IUser } from '@/core/common/interfaces/collection.interface';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { HistoryIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import style from './HistoryProfile.module.scss';

const cx = classNames.bind(style);

interface IProfile {
    profile: IUser;
}

function HistoryProfilePage({ profile }: IProfile) {
    return (
        <div className={cx('history')}>
            <div className={cx('control-title')}>
                <div className={cx('title-left')}>
                    <h2>Bài hát đã nghe</h2>
                    <p>Chỉ hiển thị với bạn</p>
                </div>
                <div className={cx('btn')}>
                    <Link href={''}>Xem tất cả</Link>
                </div>
            </div>
            <div className={cx('list-songs')}>
                {profile.historyReference?.listSong.map((item) => (
                    <div key={item._id} className={cx('single-song')}>
                        <div className={cx('single-left')}>
                            <div id={cx('id')}>1</div>
                            <div id={cx('song')}>
                                <Image src={item.thumbnailUrl} alt={''} width={40} height={40} />
                                <div id={cx('song-title')}>
                                    <div id={cx('title')}>{item.title}</div>
                                    <div id={cx('author')}>{profile.name}</div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('single-right')}>
                            <div id={cx('album')}>{formatDate(item.publish)}</div>

                            <HeartComponent />
                            <div id={cx('lenght')}>
                                <span id={cx('lenght')}>3:40</span>
                            </div>
                        </div>
                    </div>
                ))}
                {!profile.historyReference && (
                    <div className={cx('albumNot')}>
                        <HistoryIcon className={cx('icon-album')} />
                        <h2>Bạn chưa có bài hát đã nghe</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(HistoryProfilePage);
