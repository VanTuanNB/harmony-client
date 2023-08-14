import { IUser } from '@/core/common/interfaces/collection.interface';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import style from './UpdateAlbum.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: () => void;
    data: IUser | any;
}
function UpdateAlbum({ close, data }: IState) {
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <div className={cx('title')}>
                        <h2>Cập nhập album</h2>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faClose} className={cx('close')} />
                        </button>
                    </div>
                    <div className={cx('profile')}>
                        <div className={cx('img-upload')}>
                            <Image className={cx('img')} src={'/images/fallback-thumbnail-user.jpg'} width={100} height={100} alt="" />
                            <label htmlFor="file" className={cx('title-upload')}>
                                Thêm ảnh
                            </label>
                            <input type="file" name="file" id="file" />
                        </div>
                        <form action="" className={cx('form')}>
                            <input type="text" placeholder="Nhập tên album mới" value={''} />
                            <button type="submit">Cập nhập</button>
                        </form>
                    </div>
                    <p>
                        Bằng cách tiếp tục, bạn đồng ý cấp cho Harmony quyền truy cập vào hình ảnh bạn chọn tải lên. Hãy
                        chắc chắn rằng bạn có quyền tải lên hình ảnh.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UpdateAlbum;
