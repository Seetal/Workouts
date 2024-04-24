import { useContext} from "react";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import PreviousWorkoutItem from "../../components/Workouts/PreviousWorkoutItem/PreviousWorkoutItem";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import styles from './WorkoutsPage.module.scss';

const WorkoutsPage = () => {
    const { savedWorkouts, periodKeysData, handleGetPreviousMonth } = useContext(WorkoutsContext);

    const sortedWorkouts = savedWorkouts.sort(function(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    })

    console.log('sortedWorkouts', sortedWorkouts)

    let currentMonth = null;

    if(sortedWorkouts.length > 0) {
        const firstItemDate = new Date(sortedWorkouts[0].date);
        currentMonth = firstItemDate.getMonth();
    }
    
    let isNew = true;
    let animationIterator = 0;

    const previousWorkouts = sortedWorkouts && sortedWorkouts.map((item, i) => {
        const itemDate = new Date(item.date);
        if(currentMonth !== itemDate.getMonth()) {
            currentMonth = itemDate.getMonth();
            isNew = true;
            animationIterator = i;
        } else {
            isNew = false;
        }
        if(i === 0) {
            isNew = true;
        }
        const currentDelay = 100 * (i - animationIterator);
        return (
            <div key={item.id}>
                {isNew && <h2 className={styles.workoutsPage__dateHeader}>{itemDate.toLocaleString('default', { month: 'long' })} {itemDate.getFullYear()}</h2>}
                <ContentBlock isCentered={false} isFadeOn={true} fadeDelay={currentDelay} noPadding={true}>
                    <PreviousWorkoutItem {...item} />
                </ContentBlock>
            </div>
        )
    })

    const handleLoadMore = () => {
        handleGetPreviousMonth();
    }

    const workoutId = nanoid();
    console.log(periodKeysData.currentShowing)
    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            <ContentBlock isCentered={true}>
                <Link to={`/workouts/workout?id=${workoutId}`} className="button bgBlue">Start New Workout</Link>
            </ContentBlock>
            {previousWorkouts}
            <div className={styles.workoutsPage__footer}>
            {
                periodKeysData.keyData.length > periodKeysData.currentShowing ? 
                <button className="button button--alt" onClick={handleLoadMore}>Load more</button> :
                <p>You have no more previous workouts</p>
            }
            </div>
        </main>
    )
}

export default WorkoutsPage;