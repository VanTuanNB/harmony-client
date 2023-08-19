import { IUser } from '@/core/common/interfaces/collection.interface';
import { useUploadThumnailMutation } from '@/core/redux/services/s3.service';
import { usePutServiceProfileMutation } from '@/core/redux/services/user.service';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './UpdateProfile.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: (isReload: boolean) => void;
    dataProfile: IUser;
}
function UpdateProfile({ close, dataProfile }: IState) {
    const { register, handleSubmit, control } = useForm();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadThumnail, { isSuccess }] = useUploadThumnailMutation();
    const putServiceProfile = usePutServiceProfileMutation();

    useEffect(() => {
        if (isSuccess) {
            close(true);
            console.log('popup', avatar);
        }
        if (putServiceProfile[1].isSuccess) {
            close(true);
            console.log('popup', avatar);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, putServiceProfile[1].isSuccess]);

    useEffect(() => {
        if (putServiceProfile[1].data && putServiceProfile[1].data.success) {
            const privateUrl = putServiceProfile[1].data.data.privateUrl;
            if (avatar) {
                uploadThumnail({ privateUrl, file: avatar });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [putServiceProfile[1].data]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };
    const Submit = (e: any) => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            const fileExtension = file.name.split('.').pop();
            const newValue = {
                userId: dataProfile?._id,
                name: e.name,
                isNewUploadAvatar: true,
                contentType: fileExtension,
            };
            setAvatar(file);
            putServiceProfile[0](newValue);
            console.log('new profile file', newValue);
        } else {
            const newValue = {
                _id: dataProfile?._id,
                isNewUploadAvatar: false,
                name: e.name,
            };
            putServiceProfile[0](newValue);
            console.log('new profile', newValue);
        }
        console.log(e.name);
    };

    return (
        <>
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Thông tin người dùng</h2>
                            <button onClick={() => close(true)}>
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
                                        src={dataProfile.avatarUrl || '/images/fallback-thumbnail-user.jpg'}
                                        width={500}
                                        height={500}
                                        alt=""
                                    />
                                )}
                                <label htmlFor="file" className={cx('title-upload')}>
                                    Thêm ảnh
                                </label>
                                <input type="file" name="file" id="file" onChange={handleImageChange} />
                            </div>
                            <form action="" className={cx('form')} onSubmit={handleSubmit(Submit)}>
                                <input
                                    type="text"
                                    placeholder="Nhập tên của bạn"
                                    {...register('name')}
                                    defaultValue={dataProfile.name}
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
