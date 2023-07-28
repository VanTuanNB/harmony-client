'use client';
import classNames from 'classnames/bind';
import style from './PopperForm.module.scss';
import StepperControlComponent from '../StepperForm/StepperControll/StepperControl.component';
import StepperFormComponent from '../StepperForm/Stepper.Form.component';
import UploadSongComponent from './Upload/UpLoadSong.component';
import UploadThumnailComponent from './Upload/UploadThumnail.component';
import DetailComponent from './Detail/Detail.component';
import FinalComponent from './Final/Final.component';
import { useState } from 'react';
import { StepperContext } from './Context/Context.component';

const cx = classNames.bind(style);

interface UserData {
    [key: string]: any;
}

function PopperFormComponent() {
    const [currentStep, setCurrentStep] = useState(2);
    const [userData, setUserData] = useState<UserData>({});
    const [finalData, setFinalData] = useState<any[]>([]);
    const steps = ['Thêm nhạc', 'Thêm hình ảnh', 'Thêm thông tin', 'Hoàn thành'];
    const displayStep = (step: number) => {
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
    const handleClick = (event: string) => {
        let newSteps = currentStep;

        event == 'next' ? newSteps++ : newSteps--;
        newSteps > 0 && newSteps <= steps.length && setCurrentStep(newSteps);
    };
    console.log(currentStep);
    
    return (
        <div className={cx('pop-up')}>
            <div className={cx('controller')}>
                <div className={cx('form-pop-up')}>
                    <StepperControlComponent handleClick={handleClick} currentStep={currentStep} steps={steps} />
                    <StepperFormComponent currentStep={currentStep} steps={steps} />

                    <StepperContext.Provider
                        value={{
                            userData,
                            setUserData,
                            finalData,
                            setFinalData,
                        }}
                    >
                        {displayStep(currentStep)}
                    </StepperContext.Provider>
                </div>
            </div>
        </div>
    );
}

export default PopperFormComponent;
