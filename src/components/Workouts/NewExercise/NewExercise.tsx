import { useState } from 'react';
import styles from './NewExercise.module.scss';
import { Exercises } from '../../../data/Exercises';
import ContentBlock from '../../Generic/ContentBlock/ContentBlock';
import TextInput from '../../Form-Elements/TextInput/TextInput';
import { ExerciseType } from "../../../types/ExerciseType";
import { nanoid } from 'nanoid';

type Props = {
    handleAddNewExercise: (name: ExerciseType) => void;
    hideNewExercisePanel: () => void;
}

type SavedExerciseItem = {
    name: string;
    id: string;
}

const NewExercise = ({handleAddNewExercise, hideNewExercisePanel}: Props) => {
    const [savedExercises, setSavedExercises] = useState(
        () => JSON.parse(localStorage.getItem('savedExercises') || '""' ) || Exercises
    );
    const [exerciseName, setExerciseName] = useState('');

    const filteredExercises = savedExercises.filter((exercise: SavedExerciseItem) => {
        if(exercise.name.toLocaleLowerCase().includes(exerciseName.toLowerCase())) {
            return exercise
        }
    })

    const handleExerciseBtn = (e: React.MouseEvent) => {
        const target = e.target as HTMLButtonElement;
        const newExerciseDetails = {
            name: target.value,
            id: nanoid(),
            sets: [{
                    setNumber: 1,
                    weight: 0,
                    reps: 0
                }]
        }
        handleAddNewExercise(newExerciseDetails);
    }

    const saveCustomExercise = () => {
        const customExercise = {
            name: exerciseName,
            id: nanoid()
        };
        const newSavedExercises = [
            ...savedExercises, customExercise
        ];
        localStorage.setItem('savedExercises', JSON.stringify(newSavedExercises));
        setSavedExercises(newSavedExercises);
    }

    const exerciseElements = filteredExercises.map((exercise: SavedExerciseItem) => {
        return (
            <li key={exercise.id}>
                <button className={styles.newExercise__btn} value={exercise.name} onClick={handleExerciseBtn}>{exercise.name}</button>
            </li>
        )
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseName(e.target.value);
    }

    return (
        <ContentBlock isCentered={false}>
            <button className={styles.newExercise__close} onClick={hideNewExercisePanel}>
                <span className="sr-only">Cancel add new exercise</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26"><path d="m24.1 3.3-1.4-1.4-9.7 9.7-9.7-9.7-1.4 1.4 9.7 9.7-9.7 9.7 1.4 1.4 9.7-9.7 9.7 9.7 1.4-1.4-9.7-9.7z" style={{"fill": "#fff"}}/></svg>
            </button>
            <div className={styles.newExercise__inner}>
                <div className={styles.newExercise__input}>
                    <TextInput
                        name="Exercise name" 
                        id="exerciseName" 
                        label="Exercise name" 
                        value={exerciseName} 
                        handler={onChange}
                        />
                </div>
                {filteredExercises.length > 0 &&
                <ul className={styles.newExercise__list}>
                    {exerciseElements}
                </ul>
                }
                {filteredExercises.length === 0 && 
                <div className={styles.newExercise__customPanel}>
                    <p className={styles.newExercise__msg}>There are no saved exercises called <span className={styles.newExercise__newName}>{exerciseName}</span>, would you like to add it as a new exercise?</p>
                    <div className="button-row button-row--left">
                        <button className="button bgGreen" onClick={saveCustomExercise}>Yes</button>
                        <button className="button button--red" onClick={() => setExerciseName('')}>No</button>
                    </div>
                </div>
                }
            </div>
        </ContentBlock>
    )
}

export default NewExercise;