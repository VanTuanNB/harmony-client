import { IUser } from '@/core/common/interfaces/collection.interface';
import HeartComponent from '@/shared/components/Heart/Heart.component';
import { ListSongIcon } from '@/shared/components/Svg/index.component';
import { formatDate } from '@/utils/format.util';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import style from './FavoriteProfile.module.scss';

const cx = classNames.bind(style);

interface IProfile {
    profile: IUser;
}

function FavoriteProfilePage({ profile }: IProfile) {
    return (
        <div className={cx('favorite')}>
            <div className={cx('control-title')}>
                <div className={cx('title-left')}>
                    <h2>Bài hát yêu thích</h2>
                    <p>Chỉ hiển thị với bạn</p>
                </div>
                <div className={cx('btn')}>
                    <Link href={''}>Xem tất cả</Link>
                </div>
            </div>
            <div className={cx('list-songs')}>
                {profile.favoriteListReference?.listSong.map((item, index) => (
                    <div key={item._id} className={cx('single-song')}>
                        <div className={cx('single-left')}>
                            <div id={cx('id')}>{index + 1}</div>
                            <div id={cx('song')}>
                                <Image src={item.thumbnailUrl} alt={''} width={40} height={40}></Image>
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
                {!profile.favoriteListReference && (
                    <div className={cx('albumNot')}>
                        <ListSongIcon className={cx('icon-album')} />
                        <h2>Bạn chưa thêm bài hát yêu thích</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(FavoriteProfilePage);
