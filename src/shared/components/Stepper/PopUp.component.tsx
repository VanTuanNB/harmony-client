'use client';
import classNames from 'classnames/bind';
import style from './PopUp.module.scss';
import UploadSongComponent from './Upload/UpLoadSong.component';
import { useEffect, useState } from 'react';
import PopUpPageComponent from './PopUpPages.component';
const cx = classNames.bind(style);

function PopUpComponent() {
    const [step, setStep] = useState(1);
    const [showPopUp, setShowPopUp] = useState(true);
    const label = ['Thêm bài hát', 'Thêm hình ảnh', 'Thêm thông tin', 'Hoàn thành'];
    useEffect(() => {
        handleClick;
    }, [step]);
    const handleClick = () => {
        if (step === label.length) {
            setShowPopUp(false);
        } else {
            setStep(step + 1);
        }
    };
    const handleLabel = label.map((data, index) => {
        return (
            <li key={index} className={cx('step-wizard-item', { 'current-item': index === step - 1 })}>
                <span className={cx('progress-count')}>{index + 1}</span>
                <span className={cx('progress-label')}>{data}</span>
            </li>
        );
    });
    return (
        <>
            {showPopUp && (
                <div className={cx('pop-up')}>
                    <div className={cx('controller')}>
                        <div className={cx('form-pop-up')}>
                            <div className={cx('btn-top')}>
                                <h2>{label[step - 1]}</h2>
                                <button onClick={() => setShowPopUp(false)} className={cx('close')}>
                                    X
                                </button>
                            </div>
                            <section className={cx('step-wizard')}>
                                <ul className={cx('step-wizard-list')}>{handleLabel}</ul>
                            </section>
                            <PopUpPageComponent step={step} />
                            <div className={cx('line-btn')}>
                                <button onClick={() => handleClick()} className={cx('next')}>
                                    Tiếp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PopUpComponent;
