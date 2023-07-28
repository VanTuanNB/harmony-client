import classNames from 'classnames/bind';
import style from './Upload.module.scss';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(style);

function UploadSongComponent() {
    return (
        <form className={cx('upload')}>
            <div className={cx('zone')}>
                <FontAwesomeIcon icon={faUpload} className={cx('icon')}/>
                <div className={cx('selectFile')}>
                    <label htmlFor="file">Chọn tệp</label>
                    <input type="file" />
                </div>
                <p>File không quá : 10 MB</p>
            </div>
        </form>
    );
}

export default UploadSongComponent;
