import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './CreateAlbum.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: () => void;
}
function CreateAlbum({ close }: IState) {
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <div className={cx('title')}>
                        <h2>Tạo Album mới</h2>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faClose} className={cx('close')} />
                        </button>
                    </div>
                    <div className={cx('profile')}>
                        <form action="" className={cx('form')}>
                            <input type="text" placeholder="Nhập tên Album" />
                            <button type="submit">Tạo album</button>
                        </form>
                    </div>
                    <p>
                        Tạo album mới và thêm bài hát của bạn. Harmony chúng tôi sẽ public album của bạn đến tất cả mọi
                        người
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CreateAlbum;
