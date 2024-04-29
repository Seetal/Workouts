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
}

const WorkoutsContext = createContext<workoutsContextType>({
    savedWorkouts: [],
    setSavedWorkouts: () => {},
    periodKeysData: {
        keyData: [],
        currentShowing: 0
    },
    setPeriodKeysData: () => {},
    handleGetPreviousMonth: () => {}
});


const periodKeys = localStorage.getItem('workoutPeriodKeys');
const periodData: PeriodKeysDataType = {
    keyData: [],
    currentShowing: 0
};
let parsedWorkoutData = [];
if (periodKeys) {
    periodData.keyData = JSON.parse(periodKeys);
    const latestWorkoutData = localStorage.getItem(periodData.keyData[0].periodKey) || '""';
    periodData.currentShowing = 1;
    parsedWorkoutData = JSON.parse(latestWorkoutData);
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

    return (
        <WorkoutsContext.Provider value={{ savedWorkouts, setSavedWorkouts, periodKeysData, setPeriodKeysData, handleGetPreviousMonth }}>
            {children}
        </WorkoutsContext.Provider>
    )
};

export { WorkoutsContextProvider, WorkoutsContext };