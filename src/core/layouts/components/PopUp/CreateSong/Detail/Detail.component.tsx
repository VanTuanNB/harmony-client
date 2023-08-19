'use client';
import { IGenre, ISong, IUser } from '@/core/common/interfaces/collection.interface';
import { useGetServiceGenreQuery } from '@/core/redux/services/genre.service';
import { usePostCreateSongMutation } from '@/core/redux/services/song.service';
import { useGetServiceUserRoleComposerQuery } from '@/core/redux/services/user.service';
import Toast from '@/shared/components/ToastNotification/Toast/Toast.component';
import classNames from 'classnames/bind';
import { FC, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import style from './Detail.module.scss';
const cx = classNames.bind(style);

const customStyles: StylesConfig = {
    control: (provided) => ({
        ...provided,
        width: '100%',
        height: '120%',
        borderRadius: '5px',
        background: 'none',
        paddingLeft: '10px',
        color: 'var(--theme-mode-color)',
        border: '2px solid var(--theme-mode-color)',
        outline: 'none',
    }),
};
interface UploadDetailComponentProps {
    handleUploadDetail: any;
    label: string;
    uploadId: string;
    user: IUser;
}
const DetailComponent: FC<UploadDetailComponentProps> = ({ handleUploadDetail, label, uploadId, user }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISong>();
    const [genresReference, setListGenreId] = useState<string[]>([]);
    const [performers, setListPerformers] = useState<string[]>([]);
    const [success, setSuccess] = useState(true);
    const [dataGenre, setDataGenre] = useState<IGenre[]>();
    const [dataUser, setDataUser] = useState<IUser[]>();
    const [postCreateSong, { data }] = usePostCreateSongMutation();
    const aipGetGenre = useGetServiceGenreQuery();
    const aipGetUserComposer = useGetServiceUserRoleComposerQuery();

    useEffect(() => {
        if (data) {
            const response = {
                status: data.status,
                success: data.success,
                message: data.message,
            };
            handleUploadDetail(response);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (aipGetGenre.data) {
            setDataGenre(aipGetGenre.data.data);
        }
        if (aipGetUserComposer.data) {
            setDataUser(aipGetUserComposer.data.data);
        }
    }, [aipGetGenre.data, aipGetUserComposer.data]);
    const handleChangeGenre = (ars: any) => {
        setListGenreId(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const inputGenre = dataGenre?.map((song) => ({
        label: song.title,
        value: song._id,
    }));
    const inputUsers = dataUser?.map((user) => ({
        label: user.name,
        value: user._id,
    }));
    const handleChangePerformers = (ars: any) => {
        setListPerformers(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const onSubmitDetail = (values: any) => {
        const newValue = {
            ...values,
            genresReference,
            performers,
            uploadId,
        };
        postCreateSong(newValue);
        setSuccess(false);
    };

    return (
        <>
            {!success && <Toast message="Thêm bài hát mới thành công" state="success" title="Thành công" />}
            <h2 className={cx('title')}>{label}</h2>
            <form onSubmit={handleSubmit(onSubmitDetail)}>
                <div className={cx('form')}>
                    <div className={cx('col-6')}>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Tiêu đề:
                            </label>
                            <input
                                type="text"
                                placeholder="Write here..."
                                className={cx('input')}
                                {...register('title', { required: true })}
                            />
                            {errors.title && <p className={cx('err')}>Bạn chưa thêm tiêu đề</p>}
                        </div>

                        <div className={cx('coolinput')}>
                            <label htmlFor="date-create" className={cx('text')}>
                                Ngày sáng tác:
                            </label>
                            <input
                                id="date-create"
                                className={cx('input')}
                                type="datetime-local"
                                {...register('publish', { required: true })}
                            />
                            {errors.publish && <p className={cx('err')}>Bạn chưa thêm ngày phát hành</p>}
                        </div>
                    </div>
                    <div className={cx('col-6')}>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Tác giả:
                            </label>
                            <select {...register('userReference', { required: true })}>
                                <option value={user._id}>{user.name}</option>
                            </select>
                            {errors.userReference && <p className={cx('err')}>Bạn chưa thêm tác giả</p>}
                        </div>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Ca sỹ:
                            </label>
                            <Select
                                isMulti
                                required
                                onChange={handleChangePerformers}
                                options={inputUsers}
                                styles={customStyles}
                                className={cx('select-input')}
                            />
                        </div>
                    </div>
                    <div className={cx('col-6')}>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Thể loại:
                            </label>
                            <Select
                                isMulti
                                required
                                onChange={handleChangeGenre}
                                options={inputGenre}
                                styles={customStyles}
                                className={cx('select-input')}
                            />
                        </div>
                    </div>
                    <button type={'submit'} className={cx('next')}>
                        Thêm bài hát mới
                    </button>
                </div>
                <div className={cx('line-btn')}>
                    <p>
                        Bước cuối cùng rồi. Thêm các thông tin cần thiết của bài hát. Việc còn lại, Harmony chúng tôi sẽ
                        đưa bài hát của bạn đến với mọi người.
                    </p>
                </div>
            </form>
        </>
    );
};

export default memo(DetailComponent);
