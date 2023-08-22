import { IUser } from '@/core/common/interfaces/collection.interface';
import { PlayListIcon } from '@/shared/components/Svg/index.component';
import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import style from './PlaylistProfile.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);

interface IProfile {
    profile: IUser;
}

function PlayListProfilePage({ profile }: IProfile) {
    return (
        <div className={cx('playlist')}>
            <div className={cx('control-title')}>
                <div className={cx('title-left')}>
                    <h2>PlayList của bạn</h2>
                    <p>Chỉ hiển thị với bạn</p>
                </div>
            </div>
            <div className={cx('list')}>
                {profile.playlistReference?.map((item) => (
                    <Link href={'/album/' + item._id} key={item._id} className={cx('item')}>
                        <Image src="/images/fallback-thumbnail-user.jpg" alt="" width={100} height={100} />
                        <h3>{item.title}</h3>
                        <p>{item.userReference.name}</p>
                    </Link>
                ))}
                {profile.playlistReference?.length === 0 && (
                    <div className={cx('albumNot')}>
                        <PlayListIcon className={cx('icon-album')} />
                        <h2>Bạn chưa có playlist</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(PlayListProfilePage);
