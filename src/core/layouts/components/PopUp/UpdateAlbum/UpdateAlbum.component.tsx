import { IAlbum } from '@/core/common/interfaces/collection.interface';
import { usePutServiceAlbumMutation } from '@/core/redux/services/album.service';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { useGetServiceProfileQuery } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
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
    dataAlbum: IAlbum | undefined;
    isUpdated: (value: boolean) => void;
}
const validImageExtensions = ['jpg', 'jpeg', 'png'];
function UpdateAlbum({ dataAlbum, isUpdated }: IState) {
    const [title, setTitle] = useState<string>(dataAlbum?.title || '');
    const [information, setInformation] = useState<string>(dataAlbum?.information || '');
    const [invalidImageError, setInvalidImageError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail] = useUploadThumnailMutation();
    const [putServiceAlbum] = usePutServiceAlbumMutation();


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (!fileExtension || !validImageExtensions.includes(fileExtension)) {
                setInvalidImageError('File tải lên không phải là hình ảnh');
                setImagePreview(null);
                return;
            }
            setInvalidImageError(null);
            setImagePreview(URL.createObjectURL(file));
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
                isNewUploadThumbnail: true,
                title: title,
                information: information,
                contentType: fileExtension,
            };
            const putData = (await putServiceAlbum(newValue)) as any;
            const uploadS3 = await uploadThumnail({ privateUrl: putData.data.data.privateUrl, file });
            isUpdated(true);
        } else {
            const newValue = {
                _id: dataAlbum?._id,
                title: title,
                information: information,
                isNewUploadThumbnail: false,
                userId: dataAlbum?.userReference._id,
            };
            putServiceAlbum(newValue);
            isUpdated(true);
        }
    };

    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Cập nhật album</h2>
                            <button onClick={() => isUpdated(true)}>
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
                                            src={
                                                dataAlbum && dataAlbum.thumbnailUrl
                                                    ? `${dataAlbum.thumbnailUrl}?${new Date().getTime()}`
                                                    : '/images/fallback-thumbnail-user.jpg'
                                            }
                                            width={500}
                                            height={500}
                                            alt=""
                                            loading="lazy"
                                        />
                                    )}
                                    <label htmlFor="file" className={cx('title-upload')}>
                                        Thêm ảnh
                                    </label>
                                    {invalidImageError && <div className={cx('error-message')}>{invalidImageError}</div>}

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
                            Bằng cách tiếp tục, bạn đồng ý cấp cho Harmony quyền truy cập vào hình ảnh bạn chọn tải lên.
                            Hãy chắc chắn rằng bạn có quyền tải lên hình ảnh.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(UpdateAlbum);
