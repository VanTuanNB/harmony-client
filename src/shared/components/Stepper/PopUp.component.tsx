'use client';
import classNames from 'classnames/bind';
import style from './PopUp.module.scss';
import StepperControlComponent from './StepperControl.component';
import StepperComponent from './Stepper.component';
import UploadSongComponent from './Upload/UpLoadSong.component';
import UploadThumnailComponent from './Upload/UploadThumnail.component';
import DetailComponent from './Detail/Detail.component';
import FinalComponent from './Final/Final.component';
import { useState } from 'react';

const cx = classNames.bind(style);

function PopUpComponent() {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = ['Thêm nhạc', 'Thêm hình ảnh', 'Thêm thông tin', 'Hoàn thành'];
    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <UploadSongComponent />;
            case 2:
                return <UploadThumnailComponent />;
            case 3:
                return <DetailComponent />;
            case 4:
                return <FinalComponent />;
            default:
        }
    };
    const handleClick = (event) => {
        let newSteps = currentStep;

        event === "next" ? newSteps++
    };
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <StepperControlComponent handleClick={handleClick} currentStep={currentStep} steps={steps} />
                    <StepperComponent currentStep={currentStep} steps={steps} />
                </div>
            </div>
        </div>
    );
}

export default PopUpComponent;
