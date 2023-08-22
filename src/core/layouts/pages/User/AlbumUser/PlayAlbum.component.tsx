import classNames from 'classnames/bind';

import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import { ISong } from '@/core/common/interfaces/collection.interface';
import {
    removeSongFromSuggestListAction,
    replaceNewListNextSong,
    selectSongReducer,
    shiftListNextSong,
    startPlayingAction,
    updateStatePlayingAction,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch, useAppSelector } from '@/core/redux/hook.redux';
import { faPause, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback, useState } from 'react';
import styles from './AlbumUser.module.scss';
const cx = classNames.bind(styles);

interface IProps {
    data: ISong[];
}

function PlayingAlbumComponent({ data }: IProps) {
    const [isAllowed, setIsAllowed] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const { playing } = useAppSelector(selectSongReducer);
    const handlePlayingAlbum = useCallback(() => {
        const firstSong = data[0] as ISong;
        if (isAllowed) {
            dispatch(
                updateStatePlayingAction(
                    playing.state === EStateCurrentSong.PLAYING ? EStateCurrentSong.PAUSED : EStateCurrentSong.PLAYING,
                ),
            );
        } else {
            const filters = data.filter((song: ISong) => song._id !== firstSong._id);
            dispatch(removeSongFromSuggestListAction(firstSong._id));
            dispatch(replaceNewListNextSong(filters));
            dispatch(shiftListNextSong(firstSong._id));
            dispatch(startPlayingAction(firstSong));
            setIsAllowed(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAllowed, data, playing]);
    return (
        <div className={cx('btn-icon')} onClick={handlePlayingAlbum}>
            {data.findIndex((song: ISong) => playing.currentSong._id) !== -1 ? (
                <>
                    <FontAwesomeIcon
                        className={cx('icon-Play')}
                        icon={playing.state === EStateCurrentSong.PLAYING ? faPause : faPlayCircle}
                    />
                </>
            ) : (
                <FontAwesomeIcon className={cx('icon-Play')} icon={faPlayCircle} />
            )}
        </div>
    );
}

export default memo(PlayingAlbumComponent);
