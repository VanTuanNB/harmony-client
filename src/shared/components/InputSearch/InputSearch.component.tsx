'use client';
import { ReactNode, useState } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './InputSearch.module.scss';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface ISearchResult {
    _id: string;
    keywordSuggest: string;
}

function InputSearchComponent(): ReactNode {
    const [keyword, setKeyword] = useState<string>('');
    const [searchResult, setSearchResult] = useState<Array<ISearchResult>>([
        // {
        //     _id: '1',
        //     keywordSuggest: 'Do Something',
        // },
    ]);
    const [showHeadless, setShowHeadless] = useState<boolean>(true);
    return (
        <>
            <div className={cx('header-search')}>
                <div className={cx('header-search-wrap-box')}>
                    <HeadlessTippy
                        interactive
                        placement="bottom"
                        visible={showHeadless && searchResult.length > 0}
                        render={(attrs) => (
                            <div className={cx('popper-search')} tabIndex={-1} {...attrs}>
                                {
                                    <ul className={cx('popper-search-list')}>
                                        {searchResult.map((result: ISearchResult) => (
                                            <li key={result._id} className={cx('popper-search-item')}>
                                                <div className={cx('popper-search-content')}>
                                                    <Link
                                                        href={'/results?search_query=' + result.keywordSuggest}
                                                        className={cx('popper-search-info')}
                                                    >
                                                        <span className={cx('search-info-text')}>
                                                            {result.keywordSuggest}
                                                        </span>
                                                    </Link>
                                                    <div className={cx('popper-search-clear')}>
                                                        <FontAwesomeIcon
                                                            icon={faXmark}
                                                            className={cx('search-clear-icon')}
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
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
                                        onKeyDown={(e) => {
                                            console.log(e);
                                        }}
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
