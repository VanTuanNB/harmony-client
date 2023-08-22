import { IUser } from '@/core/common/interfaces/collection.interface';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { usePutServiceProfileMutation } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useRef, useState } from 'react';
import style from './UpdateProfile.module.scss';

const cx = classNames.bind(style);

interface IState {
    isUpdated: (isReload: boolean) => void;
    dataProfile: IUser;
}
const validImageExtensions = ['jpg', 'jpeg', 'png'];
function UpdateProfile({ isUpdated, dataProfile }: IState) {
    const [name, setName] = useState<string>(dataProfile.name);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    
    const [invalidImageError, setInvalidImageError] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail] = useUploadThumnailMutation();
    const [putServiceProfile] = usePutServiceProfileMutation();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
            if (!fileExtension || !validImageExtensions.includes(fileExtension)) {
                setInvalidImageError('File tải lên không phải là hình ảnh');
                setImagePreview(null); // Clear image preview
                return;
            }
    
            // Clear any previous error
            setInvalidImageError(null);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };
    const Submit = async (e: any) => {
        e.preventDefault();

        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const newValue = {
                userId: dataProfile?._id,
                name: name,
                isNewUploadAvatar: true,
                contentType: fileExtension,
            };
            const putData = (await putServiceProfile(newValue)) as any;
            const uploadS3 = await uploadThumnail({ privateUrl: putData.data.data.privateUrl, file });
            isUpdated(true);
        } else {
            const value = {
                _id: dataProfile._id,
                name: name,
            };
            putServiceProfile(value);
            isUpdated(true);
        }
    };

    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Thông tin người dùng</h2>
                            <button onClick={() => isUpdated(true)}>
                                <FontAwesomeIcon icon={faClose} className={cx('close')} />
                            </button>
                        </div>
                        <div className={cx('profile')}>
                            <div className={cx('img-upload')}>
                                {imagePreview ? (
                                    <Image className={cx('img')} src={imagePreview} width={100} height={100} alt="" />
                                ) : (
                                    <Image
                                        className={cx('image2')}
                                        src={
                                            dataProfile.avatarUrl
                                                ? `${dataProfile.avatarUrl}?${new Date().getTime()}`
                                                : '/images/fallback-thumbnail-user.jpg'
                                        }
                                        alt=""
                                        loading="lazy"
                                        width={500}
                                        height={500}
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
                            <form action="" className={cx('form')} onSubmit={Submit}>
                                <input
                                    type="text"
                                    placeholder="Nhập tên của bạn"
                                    value={name}
                                    onChange={handleInputName}
                                />
                                <button type="submit">Lưu</button>
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

export default UpdateProfile;
