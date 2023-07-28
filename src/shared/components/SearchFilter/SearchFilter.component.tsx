'use client';
import classNames from 'classnames/bind';
import styles from './SearchFilter.module.scss';

const cx = classNames.bind(styles);

function SearchFilterComponent() {
    return (
        <div className={cx('filter')}>
            <button><a href="http://localhost:3000/search">Tất cả</a></button> 
            <button><a href="http://localhost:3000/search/songs">Bài hát</a></button> 
            <button><a href="http://localhost:3000/search/albums">Albums</a></button> 
            <button><a href="http://localhost:3000/search/artists">Ca sĩ</a></button> 
            <button><a href="http://localhost:3000/search/playlists">Playlists</a></button> 
        </div>       
    )
}
export default SearchFilterComponent;
