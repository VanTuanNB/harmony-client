import { IAlbum, IUser } from '@/core/common/interfaces/collection.interface';
import { usePostCreateAlbumMutation } from '@/core/redux/services/album.service';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { usePathname } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import style from './CreateAlbum.module.scss';

const cx = classNames.bind(style);

interface IState {
    close: (isReload: boolean) => void;
    dataProfile: IUser;
}

function CreatePlaylist({ close, dataProfile }: IState) {
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
        close(true);
    };
    return (
        <>
            {!success && <Toast message="Thêm album mới thành công" state="success" title="Thành công" />}
            <div className={cx('pop-up')}>
                <div className={cx('controller')}>
                    <div className={cx('form-pop-up')}>
                        <div className={cx('title')}>
                            <h2>Tạo Playlist mới</h2>
                            <button onClick={() => close(true)}>
                                <FontAwesomeIcon icon={faClose} className={cx('close')} />
                            </button>
                        </div>
                        <div className={cx('profile')}>
                            <form onSubmit={handleSubmit(submit)} className={cx('form')}>
                                <input
                                    type="text"
                                    {...register('title', { required: true })}
                                    placeholder="Nhập tiêu đề playlist"
                                />
                                {errors.title && <p className={cx('err')}>Bạn chưa thêm tiêu đề</p>}

                                <button type="submit">Tạo Playlist</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default memo(CreatePlaylist);
