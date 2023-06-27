import classNames from "classnames/bind";
import styles from './CreateSong.module.scss';

const cx = classNames.bind(styles);

function CreateSong() {
    return (
        <div className={cx('create-song')}>
            <h2>Thêm bài hát mới</h2>
        </div>
    );
}

export default CreateSong;