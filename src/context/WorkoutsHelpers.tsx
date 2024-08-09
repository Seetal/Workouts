import { SavedWorkoutsType } from "../types/SavedWorkoutsType";
import { ExerciseType } from "../types/ExerciseType";

type ExerciseData = {
    newExercise: ExerciseType;
    id: string;
}
type ExerciseListData = {
    newExercises: ExerciseType[];
    id: string;
}
type SetData = {
    workoutId: string;
    exerciseId: string;
}

type UpdateValues = {
    workoutId: string;
    exerciseId: string;
    set: number;
    key: string;
    value: number;
}

export const saveToLocalStorage = (workoutDataToSave: SavedWorkoutsType) => {
    const currentDate = new Date();
    // Filter workout data to get all workouts in current month
    const workoutsToSave = workoutDataToSave.filter(item => {
        const workoutDate = new Date(item.date);
        const workoutMonth = workoutDate.getMonth();
        return workoutMonth === currentDate.getMonth();
    })
    // Create a local storage key for current month
    const currentMonthsStorageKey = `workouts_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
    localStorage.setItem(currentMonthsStorageKey, JSON.stringify(workoutsToSave));
}

export const addWorkoutToState = (newData: ExerciseListData, state: SavedWorkoutsType, previousId: string, previousExercises: ExerciseType[] | null) => {
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    const updatedData = [
        ...state, {
            id: newData.id,
            previousId: previousId,
            previousExercises: previousExercises,
            date: dateString,
            inProgress: true,
            exerciseList: newData.newExercises
        }
    ]
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const addExerciseToState = (newData: ExerciseData, state: SavedWorkoutsType) => {
    const updatedData = state.map(prevWorkout => {
        return prevWorkout.id !== newData.id ? prevWorkout : {
            ...prevWorkout, 
            exerciseList: [...prevWorkout.exerciseList, newData.newExercise]
        }
    })
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const addSetToState = (newData: SetData, state: SavedWorkoutsType) => {
    const updatedData = state.map(prevWorkout => {
        return prevWorkout.id !== newData.workoutId ? prevWorkout : {
            ...prevWorkout, 
            exerciseList: prevWorkout.exerciseList.map(exercise => {
                if(exercise.id === newData.exerciseId) {
                    return { ...exercise, sets: [...exercise.sets, 
                        {
                            setNumber: exercise.sets.length + 1,
                            weight: 0,
                            reps: 0,
                        }
                    ]}
                } else {
                    return exercise;
                }
            })
        }
    });
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const updateValuesToState = (newData: UpdateValues, state: SavedWorkoutsType) => {
    const updatedData = state.map(prevWorkout => {
        return prevWorkout.id !== newData.workoutId ? prevWorkout : {
            ...prevWorkout, 
            exerciseList: prevWorkout.exerciseList.map(exercise => {
                if(exercise.id === newData.exerciseId) {
                    return { ...exercise, sets: exercise.sets.map(set => {
                        if(set.setNumber === newData.set) {
                            return {...set, [newData.key]: newData.value}
                        } else {
                            return set;
                        }
                    })}
                } else {
                    return exercise;
                }
            })
        }
    })
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const markAsComplete = (id: string, state: SavedWorkoutsType) => {
    const updatedData = state.map(prevWorkout => {
        return prevWorkout.id !== id ? prevWorkout : {
            ...prevWorkout,
            inProgress: false
        }
    })
    saveToLocalStorage(updatedData);
    return updatedData;
}