import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import PreviousWorkouts from "../../components/Workouts/PreviousWorkouts/PreviousWorkouts";

const WorkoutsPage = () => {
    const workoutId = nanoid();
    const pageColors = { '--page-color': 'var(--clr-blue)', '--page-color-secondary': 'var(--clr-blue-secondary)' } as React.CSSProperties;
    
    return (
        <main style={pageColors}>
            <div className="create-box">
                <Link to={`/workouts/workout?id=${workoutId}`} className="button bgBlue">Start New Workout</Link>
            </div>
            <div className="fade-on">
                <PreviousWorkouts />
            </div>
        </main>
    )
}

export default WorkoutsPage;