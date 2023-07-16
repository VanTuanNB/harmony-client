'use client';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Home.module.scss';
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
function HomePage() {
    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <Image className={cx('image2')} src="/images/img1.jpg" alt="" width={350} height={200} />
                <Image className={cx('image2')} src="/images/img1.jpg" alt="" width={350} height={200} />
                <Image className={cx('image2')} src="/images/img1.jpg" alt="" width={350} height={200} />
            </div>
            <div className={cx('main-just')}>
                <h3 className={cx('title')}>Just Released</h3>
                <ul className={cx('list-listening')}>
                    {mockData.map((data) => {
                        return (
                            <li key={data._id} className={cx('item')}>
                                <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                            </li>
                        );
                    })}
                </ul>
                <h3 className={cx('title')}>Trending</h3>
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
            <div className={cx('main-ranking')}>
                <div></div>
                <h3>Ranking</h3>
                <div className={cx('ranking-image')}>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('box-ranking')}>
                            <div className={cx('image')}>
                                <Image
                                    className={cx('image3')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={115}
                                    height={115}
                                />
                            </div>
                            <div className={cx('songsinger-main')}>
                                <div className={cx('songsinger-ranking')}>
                                    <span className={cx('song')}>Anh da on hon</span>
                                    <a href="#" className={cx('singer')}>
                                        MCK
                                    </a>
                                </div>
                                <div className={cx('rankingdate-main')}>
                                    <div className={cx('ranking')}>
                                        <span>#1</span>
                                    </div>
                                    <div className={cx('date')}>
                                        <span>20.10.2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('ranking-image')}>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('box-ranking')}>
                            <div className={cx('image')}>
                                <Image
                                    className={cx('image3')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={115}
                                    height={115}
                                />
                            </div>
                            <div className={cx('songsinger-main')}>
                                <div className={cx('songsinger-ranking')}>
                                    <span className={cx('song')}>Anh da on hon</span>
                                    <a href="#" className={cx('singer')}>
                                        MCK
                                    </a>
                                </div>
                                <div className={cx('rankingdate-main')}>
                                    <div className={cx('ranking')}>
                                        <span>#1</span>
                                    </div>
                                    <div className={cx('date')}>
                                        <span>20.10.2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('ranking-image')}>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('box-ranking')}>
                            <div className={cx('image')}>
                                <Image
                                    className={cx('image3')}
                                    src="/images/img1.jpg"
                                    alt=""
                                    width={115}
                                    height={115}
                                />
                            </div>
                            <div className={cx('songsinger-main')}>
                                <div className={cx('songsinger-ranking')}>
                                    <span className={cx('song')}>Anh da on hon</span>
                                    <a href="#" className={cx('singer')}>
                                        MCK
                                    </a>
                                </div>
                                <div className={cx('rankingdate-main')}>
                                    <div className={cx('ranking')}>
                                        <span>#1</span>
                                    </div>
                                    <div className={cx('date')}>
                                        <span>20.10.2022</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('main-top')}>
                <h3>Top 100</h3>
                <div className={cx('top-image')}>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                </div>
            </div>

            <div className={cx('main-hot')}>
                <h3>Hot Album</h3>
                <div className={cx('hot-image')}>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={200} height={200} />
                        <span>99%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
