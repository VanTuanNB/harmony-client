'use client';
import classNames from 'classnames/bind';
import style from './Composer.module.scss';
import AlbumItem from '@/shared/components/AlbumItem/AlbumItem.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import ButtonSwitchTheme from '../../../../shared/components/ButtonSwitchTheme/ButtonSwitchTheme.component'

const cx = classNames.bind(style);

const mockData = [
    {
        _id: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604',
        title: 'Ngày Không Còn Em',
        listSong: [
            {
                _id: '1f1ec177-a843-4e39-8734-e23faf7adbba',
                title: 'Phiêu Bồng',
                duration: 195.63102,
            }
        ],
        updateAt: '2023-06-10T14:35:23.402Z',
    }
];

function AlbumPage () {
    return (
        <div className={cx('main-album')}>
            <nav className={cx('album-header')}>
                <div className={cx('prev-button')}><a>&lt;</a></div>
                <div className={cx('next-button')}><a>&gt;</a></div>
                <div className={cx('search-bar')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon-style')} />
                    <input className={cx('search-box')} type="text" />
                </div>
                <div>
                    {/* <ButtonSwitchTheme/> */} <button>switch theme</button>
                </div>
                <div>
                    <Image className={cx('avatar-user')} src="/images/img1.jpg" alt="" width={100} height={100} border-radius={100} />
                    <p className={cx('user-name')}>User-name</p>
                </div>
            </nav>
            <div className={cx('album-info')}>
                <Image className={cx('album-image')} src="/images/img1.jpg" alt="" width={300} height={300}/>
                <p>Playlist</p>
                <div className={cx('album-name')}>Album name</div>
                <div className={cx('detail')}>
                    <Image className={cx('detail-image')} src="/images/img1.jpg" alt="" width={40} height={40} border-radius={40} />
                    <div className={cx('number-info')}>500likes - 20 songs. start 2 hour</div>
                </div>
            </div>
            <div className={cx('list-song')}>
                <table className={cx('songs')}>
                    <tr>
                        <td>#</td>
                        <td>Title</td>
                        <td>Album</td>
                        <td>Date Add</td>
                        <td>Length</td>
                    </tr>
                    {mockData.map((data) => {
                        return (
                            <tr key={data._id} className={cx('item')}>
                                <td>1</td>
                                <td>
                                    <Image className={cx('song-thumnail')} src="/images/img1.jpg" alt="" width={100} height={100}/>
                                    <div> Song Name</div>
                                </td>
                                <td>Album Name</td>
                                <td>May 17, 2023</td>
                                <td>Length</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    )
}

export default AlbumPage;