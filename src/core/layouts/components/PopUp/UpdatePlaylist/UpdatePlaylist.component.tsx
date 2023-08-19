import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { memo } from 'react';
import style from './UpdatePlaylist.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: () => void;
}
function UpdatePlaylist({ close }: IState) {
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <div className={cx('title')}>
                        <h2>Cập nhật playlist</h2>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faClose} className={cx('close')} />
                        </button>
                    </div>
                    <div className={cx('profile')}>
                        <form action="" className={cx('form')}>
                            <input type="text" placeholder="Nhập tên playlist mới" />
                            <button type="submit">Cập nhập</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(UpdatePlaylist);
