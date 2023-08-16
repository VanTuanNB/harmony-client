import { IAlbum } from '@/core/common/interfaces/collection.interface';
import { usePutServiceAlbumMutation } from '@/core/redux/services/album.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';
import style from './UpdateAlbum.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: () => void;
    dataAlbum: IAlbum | undefined;
}
function UpdateAlbum({ close, dataAlbum }: IState) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>(dataAlbum?.title || '');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [putAlbum, { data, isLoading, isSuccess }] = usePutServiceAlbumMutation();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const newValue = {
                title: inputValue,
                isNewUploadThumbnail: true,
                userId: dataAlbum?.userReference._id,
                contentType: fileExtension,
            };
            console.log(newValue);
        } else {
            const newValue = {
                title: inputValue,
                isNewUploadThumbnail: false,
                userId: dataAlbum?.userReference._id,
            };
            console.log(newValue);
        }
    };
    

    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <div className={cx('title')}>
                        <h2>Cập nhật album</h2>
                        <button onClick={close}>
                            <FontAwesomeIcon icon={faClose} className={cx('close')} />
                        </button>
                    </div>
                    <div className={cx('profile')}>
                        <div className={cx('img-upload')}>
                            {imagePreview ? (
                                <Image className={cx('img')} src={imagePreview} width={100} height={100} alt="" />
                            ) : (
                                <Image
                                    className={cx('img')}
                                    src={dataAlbum?.thumbnailUrl || '/images/fallback-thumbnail-user.jpg'}
                                    width={100}
                                    height={100}
                                    alt=""
                                />
                            )}
                            <label htmlFor="file" className={cx('title-upload')}>
                                Thêm ảnh
                            </label>
                            <input type="file" name="file" id="file" onChange={handleImageChange} ref={fileInputRef} />
                        </div>
                        <form className={cx('form')} onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Nhập tên album mới"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
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

export default memo(UpdateAlbum);
