'use client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './SearchFilter.module.scss';

const cx = classNames.bind(styles);

function SearchFilterComponent() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    return (
        <div className={cx('filter')}>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <button>
                        <Link href="http://localhost:3000/search">Tất cả</Link>
                    </button>
                    <button>
                        <Link href="http://localhost:3000/search/songs">Bài hát</Link>
                    </button>
                    <button>
                        <Link href="http://localhost:3000/search/albums">Albums</Link>
                    </button>
                    <button>
                        <Link href="http://localhost:3000/search/artists">Ca sĩ</Link>
                    </button>
                    <button>
                        <Link href="http://localhost:3000/search/playlists">Playlists</Link>
                    </button>
                </>
            )}
        </div>
    );
}
export default SearchFilterComponent;
