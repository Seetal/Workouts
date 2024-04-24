export const saveToLocalStorage = (workoutDataToSave) => {
    console.log('workoutDataToSave', workoutDataToSave)
    const currentDate = new Date();
    // Filter workout data to get all workouts in current month
    const workoutsToSave = workoutDataToSave.filter(item => {
        const workoutDate = new Date(item.date);
        const workoutMonth = workoutDate.getMonth();
        console.log('item month', workoutMonth)
        console.log('current month', currentDate.getMonth())
        return workoutMonth === currentDate.getMonth();
    })
    // Create a local storage key for current month
    const currentMonthsStorageKey = `workouts_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
    console.log('workoutsToSave', workoutsToSave);
    localStorage.setItem(currentMonthsStorageKey, JSON.stringify(workoutsToSave));
}

export const addWorkoutToState = (newData, state) => {
    const date = new Date();
    const dateString = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    const updatedData = [
        ...state, {
            id: newData.id,
            date: dateString,
            exerciseList: [newData.newExercise]
        }
    ]
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const addExerciseToState = (newData, state) => {
    const updatedData = state.map(prevWorkout => {
        return prevWorkout.id !== newData.id ? prevWorkout : {
            ...prevWorkout, 
            exerciseList: [...prevWorkout.exerciseList, newData.newExercise]
        }
    })
    saveToLocalStorage(updatedData);
    return updatedData;
}

export const addSetToState = (newData, state) => {
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

export const updateValuesToState = (newData, state) => {
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