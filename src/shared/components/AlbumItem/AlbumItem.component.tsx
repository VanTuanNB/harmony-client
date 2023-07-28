import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './AlbumItem.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { IAlbum } from '@/core/common/interfaces/collection.interface';

const cx = classNames.bind(styles);

interface IAlbumItem
    extends Pick<IAlbum, '_id' | 'publish' | 'title' | 'listSong' | 'composerReference' | 'thumbnail'> {}


export default function AlbumItem({ _id, thumbnail, title, composerReference}: IAlbumItem): ReactNode {
    return (
        <div className={cx('album')}>
            <Link href={'/album/' + _id}>
                <Image src={thumbnail} width={150} height={1150} alt="fallback img" className={cx('img')} />
                <div className="title">
                    <h3>{title}</h3>
                    <p>{composerReference.name}</p>
                </div>
            </Link>
        </div>
    );
}
