'use client';
import style from './Form.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
const cx = classNames.bind(style);

const inputGenres = [
    { label: 'Lofi', value: '78383b39-7c8d-4788-adb5-ca47e05cee5f' },
    { label: 'rap', value: 'e6579dcc-9449-4852-b962-cd8bdffc0743' },
    { label: 'Ballad', value: '401dfd91-5dc9-4062-8bb5-53f529f9727f' },
];
const inputAlbum = [
    { label: 'Ngày Không Còn Em', value: 'e9cdc1ac-7d99-4283-8d31-88cfe137b604' },
    { label: 'Ngày Mất Em', value: 'ea2f0e04-73c7-4ed9-a183-d7bf1233e9d5' },
];
type ISong = {
    title: string;
    publish: string;
    performers: [];
    composerReference: string;
    albumReference: {};
    genresReference: {};
    thumbnail: string;
    fileSong: string;
};

function FormCreate() {
    const { handleSubmit, control, register } = useForm<ISong>();
    const onSubmit = handleSubmit((data) => console.log(data));
    return (
        <div className={cx('form')}>
            <form onSubmit={onSubmit}>
                <div className={cx('col-3')}>
                    <label htmlFor="">Tiêu đề: </label>
                    <input className={cx('input')} type="text" {...register('title')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Ngày sáng tác: </label>
                    <input className={cx('input')} type="datetime-local" {...register('publish')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Sáng tác: </label>
                    <select {...register('composerReference')}>
                        <option value="1211312">Huy Nguyen</option>
                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể hiện: </label>
                    <select {...register('performers')}>
                        <option value="1211312">Nguyễn Quang Huy</option>
                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể Loại: </label>
                    <Controller
                        name="genresReference"
                        control={control}
                        render={({ field }) => <Select {...field} options={inputGenres} isMulti className={cx('select-input')} />}
                    />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Album:</label>
                    <Controller
                        name="albumReference"
                        control={control}
                        render={({ field }) => <Select {...field} options={inputAlbum} isMulti   className={cx('select-input')} />}
                    />
                </div>
                <button>Thêm bài hát</button>
            </form>
        </div>
    );
}

export default FormCreate;
