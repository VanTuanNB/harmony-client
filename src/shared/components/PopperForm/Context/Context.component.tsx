import { createContext } from 'react';

interface UserData {
    [key: string]: any;
}

interface StepperContextType {
    userData: UserData;
    setUserData: (userData: UserData) => void;
    finalData: any[];
    setFinalData: (finalData: any[]) => void;
}

export const StepperContext = createContext<StepperContextType>({
    userData: {},
    setUserData: () => {},
    finalData: [],
    setFinalData: () => {},
});
