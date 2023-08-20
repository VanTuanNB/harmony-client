'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { ISongStore } from '@/core/common/interfaces/songStore.interface';
import {
    pushListSuggestSongIntoStoreAction,
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    selectSongReducer,
    startPlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { useGetSuggestSongQuery } from '@/core/redux/services/song.service';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { ReactNode, memo, useCallback, useEffect, useRef, useState } from 'react';
import SkeletonLoading from '../Loading/Skeleton/SkeletonLoading.component';
import LazyLoadSuggestComponent from './LazyLoadSuggest/LazyLoad.component';
import styles from './Suggest.module.scss';

const cx = classNames.bind(styles);

function SuggestComponent(): ReactNode {
    // const [listSong, setListSong] = useState<ISong[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [skip, setSkip] = useState<boolean>(false);
    const { data, error, isLoading, isFetching } = useGetSuggestSongQuery(
        { page: pageNumber, size: 10 },
        { skip: skip },
    );
    const observer = useRef<IntersectionObserver>();
    const triggerRef = useCallback((node: HTMLDivElement) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPageNumber((prevPageNumber) => prevPageNumber + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, []);

    const dispatch = useAppDispatch();
    const store: ISongStore = useAppSelector(selectSongReducer);
    useEffect(() => {
        if (data) {
            dispatch(pushListSuggestSongIntoStoreAction(data.data));
            if (data.paging?.totalPages === pageNumber) setSkip(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);
    const handleClickMediaItem = useCallback(
        (_id: string) => {
            const songSelected = store.playlist.suggests.find((song) => song._id === _id);
            if (!!store.playlist.prevSongs.length && !!store.playing.currentSong) {
                dispatch(pushSongIntoPrevPlayListAction(songSelected as any));
            }
            dispatch(removeSongFromSuggestListAction(_id));
            dispatch(startPlayingAction(songSelected as ISong));
        },
        [dispatch, store],
    );
    // useEffect(() => {
    //     if (data && data.success) {
    //         setListSong((prevSong) => {
    //             return [...prevSong, ...data.data].filter((song: ISong) => song._id !== store.playing.currentSong._id);
    //         });
    //     }
    // }, [data, store.playing.currentSong]);
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Gợi ý cho bạn</h2>
            <div className={cx('contents')}>
                {isLoading && <SkeletonLoading count={10} />}
                {store.playlist.suggests.length > 0 && (
                    <>
                        <LazyLoadSuggestComponent
                            items={store.playlist.suggests}
                            onClickItem={handleClickMediaItem}
                            trigger={triggerRef}
                        />
                    </>
                )}
                {isFetching && <SkeletonLoading count={10} />}
                {error && (
                    <div className={cx('wrapper-disconnect-network')}>
                        <FontAwesomeIcon className={cx('icon-wifi')} icon={faWifi} />
                        <span className={cx('disconnect-network-title')}>Bạn đã mất kết nối internet...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default memo(SuggestComponent);
