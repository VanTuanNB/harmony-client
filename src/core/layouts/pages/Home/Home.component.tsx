'use client';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useState } from 'react';
import styles from './Home.module.scss';
const cx = classNames.bind(styles);
// const mockData: ISong = [{
//     _id: 'ewqeisad_$12312_#12312e',
//     title: 'Bật tình yêu lên',

// }]
function HomePage() {
    const [startImageIndex, setStartImageIndex] = useState(0); // Vị trí của ảnh đầu tiên trong vùng

    const images = [
        '/images/thumnail1.jpg',
        '/images/thumnail2.jpg',
        '/images/thumnail3.jpg',
        '/images/thumnail4.jpg',
        '/images/thumnail1.jpg',
        '/images/thumnail2.jpg',
    ]; // Đường dẫn của các ảnh
    const imagesToShow = images.slice(startImageIndex, startImageIndex + 3); // Lấy ra 3 ảnh để hiển thị

    const showNextImages = () => {
        setStartImageIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 3));
    };

    const showPreviousImages = () => {
        setStartImageIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };
    return (
        <div className={cx('main-home')}>
            <div className={cx('main-image')}>
                <button className={cx('icon-slideright')} onClick={showPreviousImages}>
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>

                {imagesToShow.map((image, index) => (
                    <Image key={index} className={cx('image2')} src={image} width={1000} height={1000} alt="" />
                ))}
                <button className={cx('icon-slideleft')} onClick={showNextImages}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
            </div>
            <div className={cx('main-just')}>
                <h3 className={cx('title')}>Just Released</h3>
                <ul className={cx('list-listening')}>
                    {/* {mockData.map((data) => {
                        return (
                            <li key={data._id} className={cx('item')}>
                                <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                            </li>
                        );
                    })} */}
                </ul>
                <h3 className={cx('title')}>Trending</h3>
                <ul className={cx('list-listening')}>
                    {/* {mockData.map((data) => {
                        return (
                            <li key={data._id} className={cx('item')}>
                                <MediaItem title={data.title} thumbnail={data.thumbnail} performers={data.performers} />
                            </li>
                        );
                    })} */}
                </ul>
            </div>
            <div className={cx('main-ranking')}>
                <div></div>
                <h3>Ranking</h3>
                <div className={cx('list-rank')}>
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
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
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
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
                    <div className={cx('ranking-image-1')}>
                        <div className={cx('image')}>
                            <Image className={cx('image3')} src="/images/img1.jpg" alt="" width={1} height={1} />
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
            <div className={cx('main-top')}>
                <h3>Top 100</h3>
                <div className={cx('top-image')}>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                    <div className={cx('top-image-1')}>
                        <Image className={cx('image4')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>Top 100 Teenagers Songs</span>
                    </div>
                </div>
            </div>

            <div className={cx('main-hot')}>
                <h3>Hot Album</h3>
                <div className={cx('hot-image')}>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                    <div className={cx('hot-image-1')}>
                        <Image className={cx('image5')} src="/images/img1.jpg" alt="" width={1} height={1} />
                        <span>99%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
