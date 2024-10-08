import { createContext, useState } from "react";
import { WorkoutType } from "../types/WorkoutType";

type SavedWorkoutsType = WorkoutType[];
type PeriodKeyType = {
    periodKey: string;
    month: string;
}
type KeyDataType = PeriodKeyType[] | [];
type PeriodKeysDataType = {
    keyData: KeyDataType;
    currentShowing: number;
}
type workoutsContextType = {
    savedWorkouts: SavedWorkoutsType;
    setSavedWorkouts: React.Dispatch<React.SetStateAction<SavedWorkoutsType>>;
    periodKeysData: PeriodKeysDataType;
    setPeriodKeysData: React.Dispatch<React.SetStateAction<PeriodKeysDataType>>;
    handleGetPreviousMonth: () => void;
    updatePeriodKeys: () => void;
}

const WorkoutsContext = createContext<workoutsContextType>({
    savedWorkouts: [],
    setSavedWorkouts: () => {},
    periodKeysData: {
        keyData: [],
        currentShowing: 0
    },
    setPeriodKeysData: () => {},
    handleGetPreviousMonth: () => {},
    updatePeriodKeys: () => {}
});


const periodKeys = localStorage.getItem('workoutPeriodKeys');
const periodData: PeriodKeysDataType = {
    keyData: [],
    currentShowing: 0
};
let parsedWorkoutData: WorkoutType[] = [];
if (periodKeys) {
    periodData.keyData = JSON.parse(periodKeys);
    const latestWorkoutData = localStorage.getItem(periodData.keyData[0].periodKey) || '""';
    periodData.currentShowing = 1;
    parsedWorkoutData = JSON.parse(latestWorkoutData);
    if(periodData.keyData.length > 1) {
        const previousWorkoutData = localStorage.getItem(periodData.keyData[1].periodKey) || '""';
        const previousDataParsed = JSON.parse(previousWorkoutData);
        for (const obj of previousDataParsed) {
            parsedWorkoutData.push(structuredClone(obj));
        }
        periodData.currentShowing = 2;
    }
}
const WorkoutsContextProvider = ({ children }: { children: JSX.Element}) => {
    const [ savedWorkouts, setSavedWorkouts ] = useState(parsedWorkoutData);
    const [ periodKeysData, setPeriodKeysData ] = useState(periodData);

    const handleGetPreviousMonth = () => {
        const previousMonthsKey = periodKeysData.keyData[periodKeysData.currentShowing].periodKey;
        const previousMonthsData = localStorage.getItem(previousMonthsKey);
        const previousMonthsWorkoutsData = previousMonthsData ? JSON.parse(previousMonthsData) : [];
        setPeriodKeysData(prevState => {
            return {
                ...prevState, currentShowing: prevState.currentShowing + 1
            }
        })
        setSavedWorkouts((prevState: SavedWorkoutsType) => {
            return [...prevState, ...previousMonthsWorkoutsData]
        })
    }

    const updatePeriodKeys = () => {
        const currentDate = new Date();
        const currentMonthsStorageKey = `workouts_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        if ((periodKeysData.keyData.length === 0) || ((periodKeysData.keyData.length > 0) && (periodKeysData.keyData[0].periodKey !== currentMonthsStorageKey))) {
            const newKeyData = {
                periodKey: currentMonthsStorageKey, month: currentDate.toLocaleString('default', { month: 'long' })
            }
            const newLocalKeyData = [
                newKeyData, ...periodKeysData.keyData
            ]
            localStorage.setItem('workoutPeriodKeys', JSON.stringify(newLocalKeyData));
            setPeriodKeysData(prevState => {
                return { keyData: [newKeyData, ...prevState.keyData], currentShowing: prevState.currentShowing + 1 };
            })
        }
    }

    return (
        <WorkoutsContext.Provider value={{ savedWorkouts, setSavedWorkouts, periodKeysData, setPeriodKeysData, handleGetPreviousMonth, updatePeriodKeys }}>
            {children}
        </WorkoutsContext.Provider>
    )
};

export { WorkoutsContextProvider, WorkoutsContext };