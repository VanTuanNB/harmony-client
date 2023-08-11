'use client';
import style from './Detail.module.scss';
import classNames from 'classnames/bind';
import React, { FC, useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { useForm } from 'react-hook-form';
import { usePostCreateSongMutation } from '@/core/redux/services/song.service';
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
type ISong = {
    title: string;
    publish: string;
    performers: [];
    composerReference: string;
    albumReference: string[];
    genresReference: string[];
    thumbnail: string;
    fileSong: string;
};

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
    const [postCreateSong, { data }] = usePostCreateSongMutation();

    useEffect(() => {
        if (data) {
            const response = {
                status: data.status,
                success: data.success,
                message: data.message,
            };
            console.log('response: ' + response);
            handleUploadDetail(response);
        }
    }, [data]);
    const handleChange = (ars: any) => {
        setListGenreId(() => {
            return ars.map((option: any) => option.value);
        });
        setListAlbumId(() => {
            return ars.map((option: any) => option.value);
        });
    };

    const onSubmitDetail = (values: any) => {
        const newValue = {
            ...values,
            albumReference,
            genresReference,
            uploadId,
        };
        console.log(newValue);
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
                            {errors.title && <p className={cx('err')}>Title is required</p>}
                        </div>

                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Ngày sáng tác:
                            </label>
                            <input
                                className={cx('input')}
                                type="datetime-local"
                                {...register('publish', { required: true })}
                            />
                            {errors.publish && <p className={cx('err')}>Publish is required</p>}
                        </div>
                    </div>
                    <div className={cx('col-6')}>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Tác giả:
                            </label>
                            <select {...register('composerReference', { required: true })}>
                                <option value="2cbbe26b-173f-4fee-af7c-1c8fdeedee9f">Huy Nguyen</option>
                            </select>
                            {errors.composerReference && <p className={cx('err')}>ComposerReference is required</p>}
                        </div>
                        <div className={cx('coolinput')}>
                            <label htmlFor="" className={cx('text')}>
                                Thể hiện
                            </label>
                            <select {...register('performers', { required: true })}>
                                <option value="2cbbe26b-173f-4fee-af7c-1c8fdeedee9f">Nguyễn Quang Huy</option>
                            </select>
                            {errors.performers && <p className={cx('err')}>Performers is required</p>}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                options={inputAlbum}
                                styles={customStyles}
                                className={cx('select-input')}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('line-btn')}>
                    <button type={'submit'} className={cx('next')}>
                        Gửi
                    </button>
                </div>
            </form>
        </>
    );
};

export default DetailComponent;
