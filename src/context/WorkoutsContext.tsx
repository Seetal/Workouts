import { createContext, useEffect, useReducer } from "react";
import { WorkoutType } from "../types/WorkoutType";

type WorkoutContextType = {
    savedWorkouts: WorkoutType[] | null;
    handleAddWorkout: (newWorkout: WorkoutType) => void;
    handleUpdateWorkout: (newWorkout: WorkoutType) => void;
}

type Set = {
    setNumber: number;
    weight: number;
    reps: number;
}

type Action = {
    type: 'addWorkout' | 'addExercise' | 'addSet' | 'updateValues';
    payload: {
        id: string;
        newExercise: {
            name: string;
            id: string;
            sets: Set[];
        }
    }
}

const WorkoutsContext = createContext<WorkoutContextType>({
    savedWorkouts: null,
    handleAddWorkout: () => {},
    handleUpdateWorkout: () => {},
});

const reducer = (state: WorkoutType[], action: Action) => {
    const { type, payload } = action;
    switch (type) {
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

const savedWorkouts = localStorage.getItem('savedWorkouts');
const workoutsData = savedWorkouts ? JSON.parse(savedWorkouts) : [];

const WorkoutsContextProvider = ({ children }: { children: JSX.Element}) => {
    const [state, dispatch] = useReducer(reducer, workoutsData);

    useEffect(() => {
        localStorage.setItem('savedWorkouts', JSON.stringify(state));
    }, [state]);

    return (
        <WorkoutsContext.Provider value={{ state, dispatch }}>
            {children}
        </WorkoutsContext.Provider>
    )
};

export { WorkoutsContextProvider, WorkoutsContext };