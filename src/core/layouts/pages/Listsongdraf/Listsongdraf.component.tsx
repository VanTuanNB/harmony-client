'use client';
import { faClock, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Listsongdraf.module.scss';

const cx = classNames.bind(styles);

function ListsongdrafPage() {
    return (
        <div className={cx('song-draf')}>
            <div className={cx('album-infor')}>
                <div className={cx('image')}>
                    <Image src={''} width={232} height={232} alt="" />
                </div>
                <div className={cx('album-detail')}>
                    <div className={cx('title')}>
                        <p>List song draf</p>
                        <span className={cx('album-name')}>Starboy</span>
                    </div>
                    <div className={cx('detail')}>
                        <Image className={cx('detail-image')} src={''} width={24} height={24} alt="" />
                        <div className={cx('infor')}>
                            <span>
                                <b>The Weeknd</b> • 2016 • 100 thích • 18 bài hát, khoảng 2 giờ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className={cx('listsong-edit')}>
                <div className={cx('title-listsong')}>
                    <div id={cx('id')}>#</div>
                    <div id={cx('song')}>Bài hát</div>
                    <div id={cx('mode')}>Chế độ hiển thị</div>
                    <div id={cx('date')}>Ngày tạo</div>
                    <div id={cx('lenght')}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div id={cx('edit')}>Chỉnh sửa</div>
                </div>
            </div>
            <div className={cx('list-songs')}>
                <div className={cx('single-song')}>
                    <div id={cx('id')}>1</div>
                    <div id={cx('song')}>
                        <Image src="" width={40} height={40} alt="" />
                        <div id={cx('song-title')}>
                            <div id={cx('title')}>Starboy</div>
                            <div id={cx('author')}>The Weeknd, Daft Punk</div>
                        </div>
                    </div>
                    <div id={cx('mode')}>Riêng tư</div>
                    <div id={cx('date')}>31.10.2023</div>
                    <div id={cx('lenght')}>
                        <span>3:40</span>
                    </div>
                    <div id={cx('edit')}>
                        {' '}
                        <FontAwesomeIcon id={cx('icon')} icon={faEllipsis} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ListsongdrafPage;
