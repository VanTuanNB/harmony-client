import classNames from 'classnames/bind';
import style from './PopUp.module.scss';

const cx = classNames.bind(style);

function StepperControlComponent({handleClick, currentStep, steps}) {
    return (
        <>
            <button className={cx('close')}>X</button>
            <button onClick={()=>handleClick("next")} className={cx('next')}>Tiếp</button>
        </>
    );
}

export default StepperControlComponent;
