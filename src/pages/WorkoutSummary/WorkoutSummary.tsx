import { useParams } from "react-router-dom";
import { useContext } from "react";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import styles from './WorkoutSummary.module.scss';

const WorkoutSummary = () => {
    const { state } = useContext(WorkoutsContext);
    const { id } = useParams();
    const currentWorkout = state.find(item => item.id === id);

    console.log(currentWorkout);

    return (
        <>
            <h1 className={styles.workoutSummary__title}>Workout Summary</h1>
            <ContentBlock>
                <p></p>
            </ContentBlock>
        </>
    )
}

export default WorkoutSummary;