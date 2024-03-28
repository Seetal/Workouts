import { useState } from 'react';
import styles from './NewExercise.module.scss';
import { Exercises } from '../../../data/Exercises';
import ContentBlock from '../../Generic/ContentBlock/ContentBlock';
import TextInput from '../../Form-Elements/TextInput/TextInput';
import { ExerciseType } from "../../../types/ExerciseType";
import { nanoid } from 'nanoid';

type Props = {
    handleAddExercise: (name: ExerciseType) => void;
}

const NewExercise = ({handleAddExercise}: Props) => {

    const [exerciseName, setExerciseName] = useState('');

    const filteredExercises = Exercises.filter(exercise => {
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
                    reps: 0,
                    isComplete: false
                }]
        }
        handleAddExercise(newExerciseDetails);
    }

    const exerciseElements = filteredExercises.map(exercise => {
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
            <div className={styles.newExercise__input}>
                <TextInput
                    name="Exercise name" 
                    id="exerciseName" 
                    label="Exercise name" 
                    value={exerciseName} 
                    handler={onChange}
                    />
            </div>
            <ul className={styles.newExercise__list}>
                {exerciseElements}
            </ul>
        </ContentBlock>
    )
}

export default NewExercise;