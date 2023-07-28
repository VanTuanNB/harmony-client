import classNames from 'classnames/bind';
import style from './PopUp.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(style);



function StepperComponent({steps, currentStep}) {
    const [newSteps, setNewSteps] = useState([])
    const stepRef = useRef();
    const updateState = (stepNumber, steps){
        
    }
    useEffect( ()=>{
        const stepsState = steps.map( (steps, index)=>{
            Object.assign({},{
                description: steps,
                completed: false,
                highlighted: index === 0 ? true : false,
                selected: index === 0 ? true : false
            })
        })
        stepRef.current = stepsState
        const current = updateState(currentStep -1, stepRef.current);
        setNewSteps(current)
    },[steps,currentStep])
    const displayStep = (
        <ul className={cx('step-wizard-list')}>
            <li className={cx('step-wizard-item', 'current-item')}>
                <span className={cx('progress-count')}>1</span>
                <span className={cx('progress-label')}>Thêm bài hát</span>
            </li>
            <li className={cx('step-wizard-item')}>
                <span className={cx('progress-count')}>2</span>
                <span className={cx('progress-label')}>Thêm hình ảnh</span>
            </li>
            <li className={cx('step-wizard-item')}>
                <span className={cx('progress-count')}>3</span>
                <span className={cx('progress-label')}>Thêm thông tin</span>
            </li>
            <li className={cx('step-wizard-item')}>
                <span className={cx('progress-count')}>4</span>
                <span className={cx('progress-label')}>Hoàn thành</span>
            </li>
        </ul>
    );
    return <section className={cx('step-wizard')}>{displayStep}</section>;
}

export default StepperComponent;
