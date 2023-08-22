import {
    faBackwardStep,
    faForwardStep,
    faPause,
    faPlay,
    faRetweet,
    faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import { EStateCurrentSong } from '@/core/common/constants/common.constant';
import {
    popSongListPrevSong,
    pushSongIntoPrevPlayListAction,
    removeSongFromSuggestListAction,
    selectSongReducer,
    shiftListNextSong,
    startPlayingAction,
    unShiftListNextSong,
} from '@/core/redux/features/song/song.slice';
import { useAppDispatch } from '@/core/redux/hook.redux';
import LoadingSpinner from '@/shared/components/Loading/LoadingSpinner/LoadingSpinner.component';
import Tippy from '@tippyjs/react';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import styles from './Control.module.scss';

const cx = classNames.bind(styles);
interface IProps {
    isLoading: boolean;
    state: EStateCurrentSong;
    songId: string;
    onTogglePlaying: () => void;
}
function ControlComponent({ isLoading, state, onTogglePlaying, songId }: IProps) {
    const dispatch = useAppDispatch();
    const { playlist, playing } = useSelector(selectSongReducer);
    const handlePrevSong = () => {
        if (!!playlist.prevSongs.length) {
            dispatch(popSongListPrevSong());
            dispatch(unShiftListNextSong(playing.currentSong));
            dispatch(startPlayingAction(playlist.prevSongs[playlist.prevSongs.length - 1]));
        }
    };
    const handleNextSong = () => {
        dispatch(pushSongIntoPrevPlayListAction(playing.currentSong));
        if (!!playlist.nextSongs.length) {
            dispatch(removeSongFromSuggestListAction(playlist.nextSongs[0]._id));
            dispatch(shiftListNextSong(playlist.nextSongs[0]._id));
            dispatch(startPlayingAction(playlist.nextSongs[0]));
        } else {
            dispatch(removeSongFromSuggestListAction(playlist.suggests[0]._id));
            dispatch(startPlayingAction(playlist.suggests[0]));
        }
    };
    return (
        <div className={cx('control-buttons')}>
            <Tippy content="Phát ngẫu nhiên">
                <button className={cx('btn-actions')}>
                    <FontAwesomeIcon icon={faShuffle} className={cx('icon')} />
                </button>
            </Tippy>
            <Tippy content="Bài trước đó" disabled={playlist.prevSongs.length === 0}>
                <button
                    disabled={playlist.prevSongs.length === 0}
                    className={cx('btn-actions', playlist.prevSongs.length === 0 && 'disabled')}
                    onClick={handlePrevSong}
                >
                    <FontAwesomeIcon icon={faBackwardStep} className={cx('icon')} />
                </button>
            </Tippy>
            <button className={cx('btn-toggle-play-paused')} onClick={onTogglePlaying}>
                {isLoading || state === EStateCurrentSong.LOADING ? (
                    <LoadingSpinner width={20} height={20} />
                ) : (
                    <>
                        {state === EStateCurrentSong.PLAYING && (
                            <FontAwesomeIcon icon={faPause} className={cx('icon-play-or-pause')} />
                        )}
                        {state === EStateCurrentSong.PAUSED && (
                            <FontAwesomeIcon icon={faPlay} className={cx('icon-play-or-pause')} />
                        )}
                    </>
                )}
            </button>
            <Tippy content="Bài tiếp theo">
                <button className={cx('btn-actions')}>
                    <FontAwesomeIcon icon={faForwardStep} className={cx('icon')} onClick={handleNextSong} />
                </button>
            </Tippy>
            <Tippy content="Bật phát lại một bài">
                <div className={cx('btn-actions')}>
                    <FontAwesomeIcon icon={faRetweet} className={cx('icon')} />
                </div>
            </Tippy>
        </div>
    );
}

export default memo(ControlComponent);
