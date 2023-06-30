import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AlbumItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';


const cx = classNames.bind(styles);

interface IAlbumItem {
    id: string;
    thumbnail: string;
    title: string;
    performers: { _id: string; name: string; nickname: string };
}

export default function AlbumItem({ id, thumbnail, title, performers }: IAlbumItem): ReactNode {
    return (
        <div className={cx('album')}>
            <Link href={'/album/' + id}>
                <Image src={thumbnail} width={150} height={1150} alt="fallback img" className={cx('img')} />
                <div className="title">
                    <h3>{title}</h3>
                    <p>{performers.name}</p>
                </div>
            </Link>
        </div>
    );
}
