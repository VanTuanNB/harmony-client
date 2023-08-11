'use client';
import classNames from 'classnames/bind';
import style from './Composer.module.scss';
import Link from 'next/link';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlbumItem from '@/shared/components/AlbumItem/AlbumItem.component';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';

const cx = classNames.bind(style);

function ComposerPage() {
    function handleClickMediaItem(_id: string) {}
    return (
        // <div className={cx('composer')}>
        //     <div className={cx('composer-info')}>
        //         <div className={cx('info')}>
        //             <img src="/images/fallback-thumbnail-user.jpg" alt />
        //             <h2>Hoài Lâm</h2>
        //         </div>
        //     </div>
        //     <div className={cx('composer-song')}>
        //         <div className={cx('title')}>
        //             <h3>Bài hát nổi bật</h3>
        //         </div>
        //         <div className={cx('itemSong')}>
        //             {mockData.map((data) => {
        //                 return (
        //                     <li key={data._id} className={cx('item')}>
        //                         <MediaItem
        //                             _id={data._id}
        //                             title={data.title}
        //                             thumbnail={data.thumbnail}
        //                             performers={data.performers as any}
        //                             onClick={handleClickMediaItem}
        //                         />
        //                     </li>
        //                 );
        //             })}
        //         </div>
        //     </div>
        //     <div className={cx('composer-album')}>
        //         <div className={cx('title')}>
        //             <h3>Album Nổi bật</h3>
        //             {/* <div className={cx('btn-action')}>
        //                 <Link href={'/'}>
        //                     {' '}
        //                     <FontAwesomeIcon icon={faCirclePlus} className={cx('icon')} />{' '}
        //                 </Link>
        //             </div> */}
        //         </div>
        //         <div className={cx('item')}>
        //             {albumList.map((data) => {
        //                 return (
        //                     <AlbumItem
        //                         key={data._id}
        //                         thumbnail={data.thumbnail}
        //                         title={data.title}
        //                         id={data._id}
        //                         performers={data.composerReference}
        //                     />
        //                 );
        //             })}
        //         </div>
        //     </div>
        // </div>
        <></>
    );
}

export default ComposerPage;
