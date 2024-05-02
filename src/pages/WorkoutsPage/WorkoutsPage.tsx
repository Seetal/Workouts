import { useContext} from "react";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import PreviousWorkoutItem from "../../components/Workouts/PreviousWorkoutItem/PreviousWorkoutItem";
import { WorkoutsContext } from "../../context/WorkoutsContext";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import styles from './WorkoutsPage.module.scss';
import InProgressWorkout from "../../components/Workouts/InProgressWorkout/InProgressWorkout";
import { WorkoutType } from "../../types/WorkoutType";

type CurrentItem = {
    month: string;
    items: WorkoutType[];
    id: string;
}

const WorkoutsPage = () => {
    const { savedWorkouts, periodKeysData, handleGetPreviousMonth } = useContext(WorkoutsContext);
    const today = new Date();
    const todayToCompare = new Date(today.getFullYear(),today.getMonth(),today.getDate());

    const inProgressWorkout = savedWorkouts.find(workout => {
        const workoutDate = new Date(workout.date);
        if(workout.inProgress && (todayToCompare.getTime() === workoutDate.getTime())) {
            return workout;
        }
    })
    const completedWorkouts = savedWorkouts.filter(workout => {
            const workoutDate = new Date(workout.date);
            return (todayToCompare.getTime() !== workoutDate.getTime()) || workout.inProgress === false ;
    })
    const sortedWorkouts = completedWorkouts.sort(function(a, b) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    })


    let currentMonth: number | null = null;

    const arrangedList: CurrentItem[] = [];

    const currentItem: CurrentItem = {
        month: '',
        items: [],
        id: ''
    }


    if(sortedWorkouts.length > 0) {
        const firstItemDate = new Date(sortedWorkouts[0].date);
        currentMonth = firstItemDate.getMonth();
        currentItem.month = `${firstItemDate.toLocaleString('default', { month: 'long' })} ${firstItemDate.getFullYear()}`;
    }
    sortedWorkouts.forEach((item, i) => {
        const itemDate = new Date(item.date);
        const keyName = `${itemDate.toLocaleString('default', { month: 'long' })} ${itemDate.getFullYear()}`;

        if(itemDate.getMonth() === currentMonth) {
            currentItem.items.push(item);
        }
        if ((i === sortedWorkouts.length - 1)) {
            currentItem.id = nanoid();
            const clonedCurrentItem = {...currentItem};
            arrangedList.push(clonedCurrentItem);
            currentItem.items = [];
        }

        if (itemDate.getMonth() !== currentMonth) {
            currentItem.id = nanoid();
            const clonedCurrentItem = {...currentItem};
            arrangedList.push(clonedCurrentItem);
            currentItem.items = [];
            currentItem.items.push(item);
            currentMonth = itemDate.getMonth();
            currentItem.month = keyName;
        }
    });
    const previousWorkouts = arrangedList.map(monthWorkouts => {
        return (
            <div key={monthWorkouts.id}>
                <h2 className={styles.workoutsPage__dateHeader}>{monthWorkouts.month}</h2>
                <ul className="box-list">
                    {monthWorkouts.items.map((workout) => {
                        return (
                            <li key={workout.id}>
                                <ContentBlock isCentered={false} noPadding={true}>
                                    <PreviousWorkoutItem {...workout} />
                                </ContentBlock>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    })
    
    const handleLoadMore = () => {
        handleGetPreviousMonth();
    }

    const workoutId = nanoid();
    const pageColors = { '--page-color': 'var(--clr-blue)', '--page-color-secondary': 'var(--clr-blue-secondary)' } as React.CSSProperties;
    
    return (
        <main style={pageColors}>
            <div className="create-box">
                <Link to={`/workouts/workout?id=${workoutId}`} className="button bgBlue">Start New Workout</Link>
            </div>
            {
            inProgressWorkout && 
            <ContentBlock isCentered={false} noPadding={true}>
                <InProgressWorkout workoutDetails={inProgressWorkout} />
            </ContentBlock>
            }
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