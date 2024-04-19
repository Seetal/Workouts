import { createContext, useEffect, useReducer, useState } from "react";
import { WorkoutType } from "../types/WorkoutType";
import { ActionType } from "../types/WorkoutReducerActionType";
import { workoutsReducer } from "./WorkoutsReducer";
import { Config } from "../config/Config";
import { generateStorageKey } from "../utilities/GenerateStorageKey";


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
// const savedWorkouts = localStorage.getItem(currentMonthsStorageKey);
// let workoutsData = savedWorkouts ? JSON.parse(savedWorkouts) : [];
// console.log('current', workoutsData);

// const getPreviousMonthsData = (storageKey: string) => {
//     const previousMonthsSavedWorkouts = localStorage.getItem(storageKey);
//     const previousMonthsWorkoutsData = previousMonthsSavedWorkouts ? JSON.parse(previousMonthsSavedWorkouts) : [];
//     return previousMonthsWorkoutsData;
// }

// if (currentDate.getDate() < Config.daysThresholdPreviousWorkouts) {
//     const key = currentDate.getMonth() > 0 ? 
//     generateStorageKey(currentDate.getMonth() - 1, currentDate.getFullYear()) : 
//     generateStorageKey(11, currentDate.getFullYear() - 1);
//     const previousMonthsData = getPreviousMonthsData(key);
//     workoutsData = [...workoutsData, ...previousMonthsData];
// }
// console.log('all', workoutsData);

const WorkoutsContextProvider = ({ children }: { children: JSX.Element}) => {
    const [state, dispatch] = useReducer(workoutsReducer, parsedWorkoutData);
    const [periodKeysData, setPeriodKeysData] = useState(periodData);

    console.log('periodKeysData', periodKeysData)

    useEffect(() => {
        const currentDate = new Date();
        const workoutsToSave = state.filter(item => {
            const workoutDate = new Date(item.date);
            const workoutMonth = workoutDate.getMonth();
            return workoutMonth === currentDate.getMonth();
        })
        console.log('workoutsToSave', workoutsToSave);
        const currentMonthsStorageKey = `workouts_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        localStorage.setItem(currentMonthsStorageKey, JSON.stringify(workoutsToSave));
        if (periodKeysData.keyData[0].periodkey !== currentMonthsStorageKey) {
            const newKeyData = {
                periodkey: currentMonthsStorageKey, month: currentDate.toLocaleString('default', { month: 'long' })
            }
            setPeriodKeysData(prevState => {
                return { keyData: [newKeyData, ...prevState.keyData], currentShowing: prevState.currentShowing };
            })
        }
    }, [state]);

    const handleGetPreviousMonth = () => {
        const previousMonthsKey = periodKeysData.keyData[periodKeysData.currentShowing].periodkey;
        const previousMonthsData = localStorage.getItem(previousMonthsKey);
        const previousMonthsWorkoutsData = previousMonthsData ? JSON.parse(previousMonthsData) : [];
        dispatch({ type: 'previousMonth', payload: previousMonthsWorkoutsData });
        setPeriodKeysData(prevState => {
            return {
                ...prevState, currentShowing: prevState.currentShowing + 1
            }
        })
        console.log('Get Previous', previousMonthsWorkoutsData)
    }

    return (
        <WorkoutsContext.Provider value={{ state, dispatch, periodKeysData, setPeriodKeysData, handleGetPreviousMonth }}>
            {children}
        </WorkoutsContext.Provider>
    )
};

export { WorkoutsContextProvider, WorkoutsContext };