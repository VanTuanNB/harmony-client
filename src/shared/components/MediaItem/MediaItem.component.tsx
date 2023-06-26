import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './MediaItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

interface IMediaItem {
    thumbnail: string;
    title: string;
    performers: { _id: string; name: string; nickname: string }[];
}

export default function MediaItem({ thumbnail, title, performers }: IMediaItem): ReactNode {
    const [favorite, setFavorite] = useState<boolean>(false);
    return (
        <div className={cx('media')}>
            <div className={cx('box-left')}>
                <div className={cx('thumbnail')}>
                    <Image src={thumbnail} alt="fallback img" height={40} width={40} className={cx('img')} />
                </div>
                <div className={cx('info')}>
                    <h1 className={cx('title')}>{title}</h1>
                    <h3 className={cx('performers')}>
                        {performers.map((performer: { _id: string; name: string; nickname: string }, index: number) => (
                            <Link key={index} href={'/' + performer.nickname} className={cx('link-channel')}>
                                {performer.name}
                            </Link>
                        ))}
                    </h3>
                </div>
            </div>
            <div className={cx('box-right')}>
                <button
                    className={cx('btn', 'btn-switch-favorite')}
                    onClick={() => setFavorite((prevState) => !prevState)}
                >
                    {favorite ? <FontAwesomeIcon icon={faHeart} /> : <FontAwesomeIcon icon={faHeartRegular} />}
                </button>
                <button className={cx('btn', 'more-options')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </button>
            </div>
        </div>
    );
}
