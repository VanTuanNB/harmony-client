'use client';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import styles from './GenreDtail.module.scss';
const cx = classNames.bind(styles);
function GenreDetailPage() {
    const router = usePathname();
    const genreId = router.split('/genres/')[1];
    console.log(genreId);
    return <div className={cx('genre-detail')}></div>;
}
export default GenreDetailPage;
