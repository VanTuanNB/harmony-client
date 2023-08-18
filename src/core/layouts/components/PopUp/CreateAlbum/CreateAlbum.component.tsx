import { IAlbum, IUser } from '@/core/common/interfaces/collection.interface';
import { usePostCreateAlbumMutation } from '@/core/redux/services/album.service';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import style from './CreateAlbum.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: (isReload: boolean) => void;
    dataProfile: IUser;
}
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
function CreateAlbum({ close, dataProfile }: IState) {
    const path = usePathname();
    const resurt = path.split('/profile/')[1];
    const createAlbum = usePostCreateAlbumMutation();
    const [dataUser, setDataUser] = useState<IUser>();
    const [listSong, setListSong] = useState<string[]>([]);
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        if (dataProfile) {
            setDataUser(dataProfile);
        }
    }, [dataProfile]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAlbum>();

    const handleChangeSong = (ars: any) => {
        setListSong(() => {
            return ars.map((option: any) => option.value);
        });
    };
    const inputSong = dataUser?.songsReference?.map((song) => ({
        label: song.title,
        value: song._id,
    }));

    const submit = (e: any) => {
        const newValue = {
            ...e,
            userReference: resurt,
            listSong: listSong,
        };
        createAlbum[0](newValue);
        setSuccess(false);
        close(true)
    };
    return (
        <>
            {!success && <Toast message="Thêm album mới thành công" state="success" title="Thành công" />}
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Tạo Album mới</h2>
                            <button onClick={() => close(true)}>
                                <FontAwesomeIcon icon={faClose} className={cx('close')} />
                            </button>
                        </div>
                        <div className={cx('profile')}>
                            <form onSubmit={handleSubmit(submit)} className={cx('form')}>
                                <input
                                    type="text"
                                    {...register('title', { required: true })}
                                    placeholder="Nhập tên Album"
                                />
                                {errors.title && <p className={cx('err')}>Bạn chưa thêm tiêu đề</p>}
                                <input
                                    type="text"
                                    {...register('information', { required: true })}
                                    placeholder="Nhập mô tả album"
                                />
                                {errors.information && <p className={cx('err')}>Bạn chưa thêm mô tả </p>}
                                <input type="datetime-local" {...register('publish', { required: true })} />
                                {errors.publish && <p className={cx('err')}>Bạn chưa thêm ngày khởi tạo</p>}
                                <Select
                                    isMulti
                                    required
                                    onChange={handleChangeSong}
                                    options={inputSong}
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />
                                <button type="submit">Tạo album</button>
                            </form>
                        </div>
                        <p>
                            Tạo album mới và thêm bài hát của bạn. Harmony chúng tôi sẽ public album của bạn đến tất cả
                            mọi người
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(CreateAlbum);
