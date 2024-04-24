import { createContext, useEffect, useReducer, useState } from "react";
import { WorkoutType } from "../types/WorkoutType";
import { ActionType } from "../types/WorkoutReducerActionType";
import { workoutsReducer } from "./WorkoutsReducer";


const WorkoutsContext = createContext<{
    state: WorkoutType[] | [];
    dispatch: React.Dispatch<ActionType>;
}>({
    state: [],
    dispatch: () => null
});


const periodKeys = localStorage.getItem('workoutPeriodKeys');
let periodData = {
    keyData: [],
    currentShowing: 0
};
let parsedWorkoutData = [];
if (periodKeys) {
    periodData.keyData = JSON.parse(periodKeys);
    const latestWorkoutData = localStorage.getItem(periodData.keyData[0].periodkey) || '""';
    periodData.currentShowing = 1;
    parsedWorkoutData = JSON.parse(latestWorkoutData);
}

const WorkoutsContextProvider = ({ children }: { children: JSX.Element}) => {
    const [ savedWorkouts, setSavedWorkouts ] = useState(parsedWorkoutData);
    const [ periodKeysData, setPeriodKeysData ] = useState(periodData);

    console.log('savedWorkouts', savedWorkouts)

    const handleGetPreviousMonth = () => {
        const previousMonthsKey = periodKeysData.keyData[periodKeysData.currentShowing].periodkey;
        const previousMonthsData = localStorage.getItem(previousMonthsKey);
        const previousMonthsWorkoutsData = previousMonthsData ? JSON.parse(previousMonthsData) : [];
        setPeriodKeysData(prevState => {
            return {
                ...prevState, currentShowing: prevState.currentShowing + 1
            }
        })
        setSavedWorkouts(prevState => {
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