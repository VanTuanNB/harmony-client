'use client';
import { ISong } from '@/core/common/interfaces/collection.interface';
import { usePostCreateSongMutation } from '@/core/redux/services/song.service';
import classNames from 'classnames/bind';
import { FC, memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import style from './Detail.module.scss';
const cx = classNames.bind(style);

const inputGenres = [
    { label: 'Lofi', value: '78383b39-7c8d-4788-adb5-ca47e05cee5f' },
    { label: 'rap', value: 'e6579dcc-9449-4852-b962-cd8bdffc0743' },
    { label: 'Ballad', value: '401dfd91-5dc9-4062-8bb5-53f529f9727f' },
];
const inputAlbum = [
    { label: 'Ngày Không Còn Em', value: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604' },
    { label: 'Ngày Mất Em', value: 'ea2f0e04-73c7-4ed9-a183-d7bf1233e9d5' },
    { label: 'Điều anh muốn', value: 'ea2f0e54-73c7-4ed9-a183-d7bf5a9833e9d5' },
    { label: 'Điều ước số nhất', value: 'ea2f0e54-73c7-4ed9-a183-d7bf58452e9d5' },
];
const inputPerformers = [
    { label: 'Nguyễn Quang Huy', value: 'b2b46512-5e07-4b13-8260-328852364bf2' },
    { label: 'Huy Nguyễn', value: '2cbbe26b-173f-4fee-af7c-1c8fdeedee9f' },
];

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
}
const DetailComponent: FC<UploadDetailComponentProps> = ({ handleUploadDetail, label, uploadId }) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ISong>();
    const [genresReference, setListGenreId] = useState<string[]>([]);
    const [albumReference, setListAlbumId] = useState<string[]>([]);
    const [performers, setListPerformers] = useState<string[]>([]);
    const [postCreateSong, { data }] = usePostCreateSongMutation();

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
    const handleChangeGenre = (ars: any) => {
        setListGenreId(() => {
            return ars.map((option: any) => option.value);
        });
    };
    const handleChangeAlbum = (ars: any) => {
        setListAlbumId(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const handleChangePerformers = (ars: any) => {
        setListPerformers(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const onSubmitDetail = (values: any) => {
        const newValue = {
            ...values,
            albumReference,
            genresReference,
            performers,
            uploadId,
        };
        postCreateSong(newValue);
    };

    return (
        <>
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
                                <option value="2cbbe26b-173f-4fee-af7c-1c8fdeedee9f">Huy Nguyen</option>
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
                                options={inputPerformers}
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
                                options={inputGenres}
                                styles={customStyles}
                                className={cx('select-input')}
                            />
                        </div>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Album:
                            </label>
                            <Select
                                isMulti
                                required
                                onChange={handleChangeAlbum}
                                options={inputAlbum}
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
