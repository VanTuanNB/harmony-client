import classNames from 'classnames/bind';

import styles from './SideBarInfo.module.scss';
import MediaItem from '@/shared/components/MediaItem/MediaItem.component';

const cx = classNames.bind(styles);

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
];

function SideBarInfo() {
    return (
        <div className={cx('sidebar-info')}>
            <h2 className={cx('title')}>Danh sách phát</h2>
            <ul className={cx('list-listening')}>
                {mockData.map((data) => {
                    return (
                        <li key={data._id} className={cx('item')}>
                            <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                        </li>
                    );
                })}
            </ul>
            <h2 className={cx('title')}>Tiếp theo</h2>
            <ul className={cx('list-listening')}>
                {mockData.map((data) => {
                    return (
                        <li key={data._id} className={cx('item')}>
                            <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                        </li>
                    );
                })}
            </ul>
            <h2 className={cx('title')}>Gợi ý cho bạn</h2>
            <ul className={cx('list-listening')}>
                {mockData.map((data) => {
                    return (
                        <li key={data._id} className={cx('item')}>
                            <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBarInfo;
