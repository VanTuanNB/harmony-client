'use client';
import classNames from 'classnames/bind';
import style from './Composer.module.scss';
import Link from 'next/link';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlbumItem from '@/shared/components/AlbumItem/AlbumItem.component';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';

const cx = classNames.bind(style);

const albumList = [
    {
        _id: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604',
        title: 'Ngày Không Còn Em',
        publish: {
            $date: '2011-10-05T14:48:00.000Z',
        },
        thumbnail: '/images/fallback-thumbnail-user.jpg',
        information: '',
        composerReference: {
            _id: 'eqwdsacasc',
            name: 'Hoài Lâm',
            nickname: 'hoailam',
        },
        listSong: ['1f1ec177-a843-4e39-8734-e23faf7adbba'],
        createdAt: {
            $date: '2023-06-10T14:32:48.994Z',
        },
        updatedAt: {
            $date: '2023-06-10T14:35:23.402Z',
        },
        __v: 0,
    },
    {
        _id: 'ea2f0e04-73c7-4ed9-a183-d7bf1233e9d5',
        title: 'Ngày Mất Em',
        publish: {
            $date: '2011-10-05T14:48:00.000Z',
        },
        thumbnail: '/images/fallback-thumbnail-user.jpg',
        information: '',
        composerReference: {
            _id: 'eqwdsacasc',
            name: 'Hoài Lâm',
            nickname: 'hoailam',
        },
        listSong: ['42d3d57e-8556-4ea1-9b39-1c78c1a8f6ff'],
        createdAt: {
            $date: '2023-06-10T14:33:05.819Z',
        },
        updatedAt: {
            $date: '2023-06-10T14:50:16.106Z',
        },
        __v: 0,
    },
    {
        _id: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604',
        title: 'Ngày Không Còn Em',
        publish: {
            $date: '2011-10-05T14:48:00.000Z',
        },
        thumbnail: '/images/fallback-thumbnail-user.jpg',
        information: '',
        composerReference: {
            _id: 'eqwdsacasc',
            name: 'Hoài Lâm',
            nickname: 'hoailam',
        },
        listSong: ['1f1ec177-a843-4e39-8734-e23faf7adbba'],
        createdAt: {
            $date: '2023-06-10T14:32:48.994Z',
        },
        updatedAt: {
            $date: '2023-06-10T14:35:23.402Z',
        },
        __v: 0,
    },
    {
        _id: 'ea2f0e04-73c7-4ed9-a183-d7bf1233e9d5',
        title: 'Ngày Mất Em',
        publish: {
            $date: '2011-10-05T14:48:00.000Z',
        },
        thumbnail: '/images/fallback-thumbnail-user.jpg',
        information: '',
        composerReference: {
            _id: 'eqwdsacasc',
            name: 'Hoài Lâm',
            nickname: 'hoailam',
        },
        listSong: ['42d3d57e-8556-4ea1-9b39-1c78c1a8f6ff'],
        createdAt: {
            $date: '2023-06-10T14:33:05.819Z',
        },
        updatedAt: {
            $date: '2023-06-10T14:50:16.106Z',
        },
        __v: 0,
    },
    {
        _id: 'ea2f0e04-73c7-4ed9-a183-d7bf1233e9d5',
        title: 'Ngày Mất Em',
        publish: {
            $date: '2011-10-05T14:48:00.000Z',
        },
        thumbnail: '/images/fallback-thumbnail-user.jpg',
        information: '',
        composerReference: {
            _id: 'eqwdsacasc',
            name: 'Hoài Lâm',
            nickname: 'hoailam',
        },
        listSong: ['42d3d57e-8556-4ea1-9b39-1c78c1a8f6ff'],
        createdAt: {
            $date: '2023-06-10T14:33:05.819Z',
        },
        updatedAt: {
            $date: '2023-06-10T14:50:16.106Z',
        },
        __v: 0,
    },
];
const mockData = [
    {
        _id: 'eqwe_E123dqs_312ewq',
        title: 'Chỉ vì quá Hy vọng',
        performers: [
            {
                _id: 'eqwdsacasc',
                name: 'Hoài Lâm',
                nickname: 'hoailam',
            },
            {
                _id: 'tewrmewklfmrekwf',
                name: 'TuanCao',
                nickname: 'tuancao',
            },
        ],
        thumbnail: '/images/fallback-thumbnail-user.jpg',
    },
    {
        _id: 'eqwe_E123dqs_312ewq3434',
        title: 'Tình yêu đẹp nhất',
        performers: [
            {
                _id: 'eqwdsacasc',
                name: 'Hoài Lâm',
                nickname: 'hoailam',
            },
            {
                _id: 'tewrmewklfmrekwf',
                name: 'TuanCao',
                nickname: 'tuancao',
            },
        ],
        thumbnail: '/images/fallback-thumbnail-user.jpg',
    },
    {
        _id: 'eqwe_E123dqs_312ewq',
        title: 'Chỉ vì quá Hy vọng',
        performers: [
            {
                _id: 'eqwdsacasc',
                name: 'Hoài Lâm',
                nickname: 'hoailam',
            },
            {
                _id: 'tewrmewklfmrekwf',
                name: 'TuanCao',
                nickname: 'tuancao',
            },
        ],
        thumbnail: '/images/fallback-thumbnail-user.jpg',
    },
    {
        _id: 'eqwe_E123dqs_312ewq3434',
        title: 'Tình yêu đẹp nhất',
        performers: [
            {
                _id: 'eqwdsacasc',
                name: 'Hoài Lâm',
                nickname: 'hoailam',
            },
            {
                _id: 'tewrmewklfmrekwf',
                name: 'TuanCao',
                nickname: 'tuancao',
            },
        ],
        thumbnail: '/images/fallback-thumbnail-user.jpg',
    },
];

function ComposerPage() {
    return (
        <div className={cx('composer')}>
            <div className={cx('composer-info')}>
                <div className={cx('info')}>
                    <img src="/images/fallback-thumbnail-user.jpg" />
                    <h2>Hoài Lâm</h2>
                </div>
            </div>
            <div className={cx('composer-song')}>
                <div className={cx('title')}>
                    <h3>Bài hát nổi bật</h3>
                </div>
                <div className={cx('itemSong')}>
                    {mockData.map((data) => {
                        return (
                            <li key={data._id} className={cx('item')}>
                                <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                            </li>
                        );
                    })}
                </div>
            </div>
            <div className={cx('composer-album')}>
                <div className={cx('title')}>
                    <h3>Album Nổi bật</h3>
                    {/* <div className={cx('btn-action')}>
                        <Link href={'/'}>
                            {' '}
                            <FontAwesomeIcon icon={faCirclePlus} className={cx('icon')} />{' '}
                        </Link>
                    </div> */}
                </div>
                <div className={cx('item')}>
                    {albumList.map((data) => {
                        return (
                            <AlbumItem
                                thumbnail={data.thumbnail}
                                title={data.title}
                                id={data._id}
                                performers={data.composerReference}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default ComposerPage;
