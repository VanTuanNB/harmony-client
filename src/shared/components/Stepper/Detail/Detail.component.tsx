'use client';
import style from './Detail.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { CSSProperties } from 'react';
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
    albumReference: {};
    genresReference: {};
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

function DetailComponent() {
    const { handleSubmit, control, register } = useForm<ISong>();
    const onSubmit = handleSubmit((data) => console.log(data));
    return (
        <form onSubmit={onSubmit}>
            <div className={cx('form')}>
                <div className={cx('col-6')}>

                    <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Tiêu đề:
                        </label>
                        <input type="text" placeholder="Write here..." className={cx('input')} {...register('title')} />
                    </div>

                    <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Ngày sáng tác:
                        </label>
                        <input className={cx('input')} type="datetime-local" {...register('publish')} />
                    </div>
                </div>
                <div className={cx('col-6')}>
                <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Tác giả:
                        </label>
                        <select {...register('composerReference')}>
                            <option value="1211312">Huy Nguyen</option>
                        </select>
                    </div>
                    <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Thể hiện
                        </label>
                        <select {...register('performers')}>
                            <option value="1211312">Nguyễn Quang Huy</option>
                        </select>
                    </div>
                </div>
                <div className={cx('col-6')}>
                <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Thể loại:
                        </label>
                        <Controller
                            name="genresReference"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={inputGenres}
                                    isMulti
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />
                            )}
                        />
                    </div>
                    <div className={cx('coolinput')}>
                        <label htmlFor="" className={cx('text')}>
                            Album:
                        </label>
                        <Controller
                            name="albumReference"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={inputAlbum}
                                    isMulti
                                    styles={customStyles}
                                    className={cx('select-input')}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}

export default DetailComponent;
