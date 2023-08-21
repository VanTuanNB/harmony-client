'use client';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { ReactNode, useState } from 'react';

import { useGetServiceSearchQuery } from '@/core/redux/services/song.service';
import Image from 'next/image';
import Link from 'next/link';
import { SearchIcon } from '../Svg/index.component';
import styles from './InputSearch.module.scss';

const cx = classNames.bind(styles);

interface ISearchResult {
    _id: string;
    keywordSuggest: string;
}

function InputSearchComponent(): ReactNode {
    const [keyword, setKeyword] = useState<string>('');
    const { data } = useGetServiceSearchQuery(keyword);
    console.log('data', data);

    const [showHeadless, setShowHeadless] = useState<boolean>(true);
    return (
        <>
            <div className={cx('header-search')}>
                <div className={cx('header-search-wrap-box')}>
                    <HeadlessTippy
                        interactive
                        placement="bottom"
                        className={cx('input-search')}
                        visible={showHeadless}
                        render={(attrs) => (
                            <>
                                {data && (
                                    <div className={cx('popper-search')} tabIndex={-1} {...attrs}>
                                        {
                                            <ul className={cx('popper-search-list')}>
                                                {data && data.data.songs.length > 0 && (
                                                    <>
                                                        <h3 className={cx('title-search')}>Bài hát</h3>
                                                        {data?.data?.songs?.map((result) => (
                                                            <li key={result._id} className={cx('popper-search-item')}>
                                                                <div className={cx('popper-search-content')}>
                                                                    <Link
                                                                        href={'/results?search_query=' + result._id}
                                                                        className={cx('popper-search-info')}
                                                                    >
                                                                        <Image
                                                                            className={cx('img')}
                                                                            src={result.thumbnailUrl || ''}
                                                                            height={500}
                                                                            width={500}
                                                                            alt=""
                                                                        />
                                                                        <span className={cx('search-info-text')}>
                                                                            {result.title}
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                                {data && data.data.albums.length > 0 && (
                                                    <>
                                                        <h3 className={cx('title-search')}>Album</h3>
                                                        {data.data.albums.map((result) => (
                                                            <li key={result._id} className={cx('popper-search-item')}>
                                                                <div className={cx('popper-search-content')}>
                                                                    <Link
                                                                        href={'/results?search_query=' + result._id}
                                                                        className={cx('popper-search-info')}
                                                                    >
                                                                        <Image
                                                                            className={cx('img')}
                                                                            src={
                                                                                result.thumbnailUrl ||
                                                                                '/images/playlist.png'
                                                                            }
                                                                            height={50}
                                                                            width={50}
                                                                            alt=""
                                                                        />
                                                                        <span className={cx('search-info-text')}>
                                                                            {result.title}
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                                {data && data.data.performers.length > 0 && (
                                                    <>
                                                        <h3 className={cx('title-search')}>Ca sỹ</h3>
                                                        {data.data.performers.map((result) => (
                                                            <li key={result._id} className={cx('popper-search-item')}>
                                                                <div className={cx('popper-search-content')}>
                                                                    <Link
                                                                        href={'/composer/@' + result.nickname}
                                                                        className={cx('popper-search-info')}
                                                                    >
                                                                        <Image
                                                                            className={cx('img')}
                                                                            src={
                                                                                result.avatarUrl ||
                                                                                '/images/playlist.png'
                                                                            }
                                                                            height={50}
                                                                            width={50}
                                                                            alt=""
                                                                        />
                                                                        <span className={cx('search-info-text')}>
                                                                            {result.name}
                                                                        </span>
                                                                    </Link>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                                {data?.data.albums.length === 0 &&
                                                    data?.data.songs.length === 0 &&
                                                    data?.data.performers.length === 0 && (
                                                        <div className={cx('search-not-data')}>
                                                            <SearchIcon className={cx('icon-not-search')} />
                                                            <h3>Không tìm thấy kết quả</h3>
                                                        </div>
                                                    )}
                                            </ul>
                                        }
                                    </div>
                                )}
                            </>
                        )}
                        onClickOutside={() => setShowHeadless(false)}
                    >
                        <div className={cx('container-header')}>
                            <div className={cx('search-icon-wrapper')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon-style')} />
                            </div>
                            <div className={cx('search-input-wrapper')}>
                                <div className={cx('search-input')}>
                                    <input
                                        className={cx('search-input-tag')}
                                        type="text"
                                        placeholder="Tìm kiếm"
                                        value={keyword}
                                        onChange={(e) => setKeyword(e.target.value)}
                                        onFocus={() => setShowHeadless(true)}
                                        // onKeyDown={(e) => {}}
                                    />
                                </div>
                            </div>
                            <div className={cx('search-clear')} onClick={() => setKeyword('')}>
                                <FontAwesomeIcon icon={faXmark} className={cx('search-clear-icon')} />
                            </div>
                        </div>
                    </HeadlessTippy>
                </div>
            </div>
        </>
    );
}

export default InputSearchComponent;
