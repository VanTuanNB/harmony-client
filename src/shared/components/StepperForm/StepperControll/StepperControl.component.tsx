import classNames from 'classnames/bind';
import style from './StepperControl.module.scss';

const cx = classNames.bind(style);

interface StepperControlProps {
    handleClick: (event: string) => void;
    currentStep: number;
    steps: string[];
}

function StepperControlComponent({ handleClick, currentStep, steps }: StepperControlProps) {
    return (
        <div className={cx('container')}>
            <button className={cx('close')}>X</button>
            <button onClick={() => handleClick('next')} className={cx('next')}>
                {currentStep == steps.length - 1 ? 'Xác nhận' : 'Tiếp'}
            </button>
        </div>
    );
}

export default StepperControlComponent;
