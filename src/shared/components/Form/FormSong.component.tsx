'use client';
import style from './Form.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import Select from 'react-select';


const cx = classNames.bind(style);

const aquaticCreatures = [
    { label: 'Shark', value: '123' },
    { label: 'Dolphin', value: '213' },
    { label: 'Whale', value: '111' },
    { label: 'Octopus', value: '222' },
    { label: 'Crab', value: '333' },
    { label: 'Lobster', value: '1313' },
];

function FormCreate() {
    return (
        <div className={cx('form')}>
            <h2>Thêm bài hát mới</h2>
            <form>
                <div className={cx('col-3')}>
                    <label htmlFor="">Tiêu đề: </label>
                    <input className={cx('input')} type="text" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Ngày sáng tác: </label>
                    <input className={cx('input')} type="datetime-local" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Sáng tác: </label>
                    <select id="" name="">
                        <option value="1211312">Huy Nguyen</option>
                        <option value="1211312">Tuan Cao</option>

                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể hiện: </label>
                    <select id="" name="">
                        <option value="1211312">Nguyễn Quang Huy</option>
                    </select>
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Thể Loại: </label>
                    <Select options={aquaticCreatures} isMulti className={cx('select-input')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Album: </label>
                    <Select options={aquaticCreatures} isMulti className={cx('select-input')} />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">Hình ảnh: </label>
                    <input type="file" />
                </div>
                <div className={cx('col-3')}>
                    <label htmlFor="">File nhạc: </label>
                    <input type="file" />
                </div>
                <button>Thêm bài hát</button>
            </form>
        </div>
    );
}

export default FormCreate;
