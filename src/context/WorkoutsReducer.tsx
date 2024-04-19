import { WorkoutType } from "../types/WorkoutType";
import { ActionType } from "../types/WorkoutReducerActionType";


export const workoutsReducer = (state: WorkoutType[], action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case 'setInitialData':
            return action.payload
        case 'previousMonth':
            return [...state, ...action.payload]
        case 'addWorkout': {
            const date = new Date();
            const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            return [...state, {
                id: payload.id,
                date: dateString,
                exerciseList: [payload.newExercise]
            }]
        }
        case 'addExercise': {
            return state.map(prevWorkout => {
                return prevWorkout.id !== payload.id ? prevWorkout : {
                    ...prevWorkout, 
                    exerciseList: [...prevWorkout.exerciseList, payload.newExercise]
                }
            })
        }
        case 'addSet':
            return state.map(prevWorkout => {
                return prevWorkout.id !== payload.workoutId ? prevWorkout : {
                    ...prevWorkout, 
                    exerciseList: prevWorkout.exerciseList.map(exercise => {
                        if(exercise.id === payload.exerciseId) {
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
            })
        case 'updateValues':
            return state.map(prevWorkout => {
                return prevWorkout.id !== payload.workoutId ? prevWorkout : {
                    ...prevWorkout, 
                    exerciseList: prevWorkout.exerciseList.map(exercise => {
                        if(exercise.id === payload.exerciseId) {
                            return { ...exercise, sets: exercise.sets.map(set => {
                                if(set.setNumber === payload.set) {
                                    return {...set, [payload.key]: payload.value}
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

        default:
            return state;
    }
}