// Stepper.Form.component.tsx
import classNames from 'classnames/bind';
import style from './StepperForm.module.scss';
import { useEffect, useRef, useState } from 'react';

const cx = classNames.bind(style);

interface Step {
    description: string;
    completed: boolean;
    highlighted: boolean;
    selected: boolean;
}

interface StepperProps {
    steps: string[];
    currentStep: number;
}

function StepperComponent({ steps, currentStep }: StepperProps) {
    const [newSteps, setNewSteps] = useState<Step[]>([]);
    const stepRef = useRef<Step[]>();
    const updateState = (stepNumber: number, steps: Step[]) => {
        const newStates = [...steps];
        let count = 0;
        while (count < newStates.length) {
            if (count == stepNumber) {
                newStates[count] = { ...newStates[count], highlighted: true, selected: true, completed: true };
                count++;
            } else if (count < stepNumber) {
                newStates[count] = { ...newStates[count], highlighted: false, selected: true, completed: true };
                count++;
            } else {
                newStates[count] = { ...newStates[count], highlighted: false, selected: false, completed: false };
                count++;
            }
        }
        return newStates;
    };
    useEffect(() => {
        const stepsState = steps.map((step, index) => ({
            description: step,
            completed: false,
            highlighted: index === 0,
            selected: index === 0
        }));
        
        stepRef.current = stepsState;
        const current = updateState(currentStep - 1, stepRef.current);
        setNewSteps(current);
    }, [steps, currentStep]);

    const displayStep = newSteps.map((step, index) => (
        <div key={index} className={cx(index !== newSteps.length - 1 ? 'item1' : 'item2')}>
            <div className={cx('stepper-number')}>
                <div className={cx('number', `${step.selected ? 'choice' : ''}`)}>
                    {step.completed ? (
                        <span className="choice-done">ϫ</span>
                    ) : (
                        index + 1
                    )}
                </div>
            </div>
            <div
                className={cx(
                    'stepper-description',
                    `${step.highlighted ? 'description' : 'not-description'}`
                )}
            >
                {step.description}
            </div>
            <div className={cx('line', `${step.completed ? 'line-choice' : ''}`)}></div>
        </div>
    ));
    
    return <div className={cx('stepper')}>{displayStep}</div>;
}
export default StepperComponent;
