import { IAlbum } from '@/core/common/interfaces/collection.interface';
import { usePutServiceAlbumMutation } from '@/core/redux/services/album.service';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useEffect, useRef, useState } from 'react';
import { StylesConfig } from 'react-select';
import style from './UpdateAlbum.module.scss';

const cx = classNames.bind(style);

const customStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        height: '100%',
        width: '100%',
        borderRadius: '5px',
        border: 'none',
        paddingLeft: '10px',
        color: 'var(--theme-mode-color)',
        background: 'var(--theme-filter)',
        marginBottom: '15px',
    }),
};

interface IState {
    close: () => void;
    dataAlbum: IAlbum | undefined;
    setIsUpdated: (value: boolean) => void;
}
function UpdateAlbum({ close, dataAlbum, setIsUpdated }: IState) {
    const [title, setTitle] = useState<string>(dataAlbum?.title || '');
    const [success, setSuccess] = useState(true);
    const [information, setInformation] = useState<string>(dataAlbum?.information || '');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileThumnail, setFileThumnail] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail] = useUploadThumnailMutation();
    const [putServiceAlbum, { data }] = usePutServiceAlbumMutation();

    useEffect(() => {
        if (data) {
            const privateUrl = data.data.privateUrl;
            if (fileThumnail) uploadThumnail({ privateUrl, file: fileThumnail });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, fileThumnail]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleInputInformation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInformation(e.target.value);
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const newValue = {
                _id: dataAlbum?._id,
                title: title,
                information: information,
                isNewUploadThumbnail: true,
                userId: dataAlbum?.userReference._id,
                contentType: fileExtension,
            };
            putServiceAlbum(newValue);
            setFileThumnail(file);
        } else {
            const newValue = {
                _id: dataAlbum?._id,
                title: title,
                information: information,
                isNewUploadThumbnail: false,
                userId: dataAlbum?.userReference._id,
            };
            putServiceAlbum(newValue);
        }
        setSuccess(false);
        setIsUpdated(true);
    };

    return (
        <>
            {!success && <Toast message="Cập nhập album thành công" state="success" title="Thành công" />}
            {success && (
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
                                <form className={cx('form')} onSubmit={handleSubmit}>
                                    <div className={cx('img-upload')}>
                                        {imagePreview ? (
                                            <Image
                                                className={cx('img')}
                                                src={imagePreview}
                                                width={100}
                                                height={100}
                                                alt=""
                                            />
                                        ) : (
                                            <Image
                                                className={cx('img')}
                                                src={dataAlbum?.thumbnailUrl || '/images/fallback-thumbnail-user.jpg'}
                                                width={500}
                                                height={500}
                                                alt=""
                                            />
                                        )}
                                        <label htmlFor="file" className={cx('title-upload')}>
                                            Thêm ảnh
                                        </label>
                                        <input
                                            type="file"
                                            name="file"
                                            id="file"
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                        />
                                    </div>

                                    <input
                                        type="text"
                                        placeholder="Nhập tên album mới"
                                        value={title}
                                        onChange={handleInputTitle}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Nhập mô tả mới"
                                        value={information}
                                        onChange={handleInputInformation}
                                    />

                                    <button type="submit">Cập nhập</button>
                                </form>
                            </div>
                            <p>
                                Bằng cách tiếp tục, bạn đồng ý cấp cho Harmony quyền truy cập vào hình ảnh bạn chọn tải
                                lên. Hãy chắc chắn rằng bạn có quyền tải lên hình ảnh.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default memo(UpdateAlbum);
