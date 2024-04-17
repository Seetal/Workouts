import { useContext } from "react";
import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";
import PreviousWorkoutItem from "../components/Workouts/PreviousWorkoutItem/PreviousWorkoutItem";
import { WorkoutsContext } from "../context/WorkoutsContext";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";

const WorkoutsPage = () => {

    const { state } = useContext(WorkoutsContext);

    const previousWorkouts = state.map((item, i) => {
        const currentDelay = 200 * i;
        return (
            <ContentBlock key={item.id} isCentered={false} isFadeOn={true} fadeDelay={currentDelay}>
                <PreviousWorkoutItem {...item} />
            </ContentBlock>
        )
    })

    const workoutId = nanoid();

    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            <ContentBlock isCentered={true}>
                <Link to={`/workouts/workout?id=${workoutId}`} className="button bgBlue">Create New Workout</Link>
            </ContentBlock>
            {previousWorkouts}
        </main>
    )
}

export default WorkoutsPage;