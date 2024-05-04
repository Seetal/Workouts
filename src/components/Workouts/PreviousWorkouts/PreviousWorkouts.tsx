import { useContext } from "react";
import { WorkoutsContext } from "../../../context/WorkoutsContext";
import { WorkoutType } from "../../../types/WorkoutType";
import { nanoid } from "nanoid";
import styles from './PreviousWorkouts.module.scss';
import ContentBlock from "../../Generic/ContentBlock/ContentBlock";
import PreviousWorkoutItem from "../PreviousWorkoutItem/PreviousWorkoutItem";
import InProgressWorkout from "../InProgressWorkout/InProgressWorkout";

type CurrentItem = {
    month: string;
    items: WorkoutType[];
    id: string;
}

const PreviousWorkouts = () => {

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
    let currentId = '';
    sortedWorkouts.forEach((item, i) => {
        const itemDate = new Date(item.date);
        const keyName = `${itemDate.toLocaleString('default', { month: 'long' })} ${itemDate.getFullYear()}`;
        
        if(itemDate.getMonth() === currentMonth) {
            currentItem.items.push(item);
        }
        if ((i === sortedWorkouts.length - 1)) {
            currentItem.id = `${item.id}abc`;
            console.log(`AAAA ${item.id}abc`)
            const clonedCurrentItem = {...currentItem};
            arrangedList.push(clonedCurrentItem);
            currentItem.items = [];
        }

        if (itemDate.getMonth() !== currentMonth) {
            currentItem.id = `${currentId}abc`;
            console.log(`BBBB ${currentId}abc`)
            const clonedCurrentItem = {...currentItem};
            arrangedList.push(clonedCurrentItem);
            currentItem.items = [];
            currentItem.items.push(item);
            currentMonth = itemDate.getMonth();
            currentItem.month = keyName;
        }
        currentId = item.id;
    });
    const previousWorkouts = arrangedList.map(monthWorkouts => {
        return (
            <div key={monthWorkouts.id}>
                <h2 className={styles.previousWorkouts__dateHeader}>{monthWorkouts.month}</h2>
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

    const noWorkouts = savedWorkouts.length > 0 ? 'You have no more previous workouts.' : 'You have no previous workouts.';

    return (
        <>
            {
            inProgressWorkout && 
            <ContentBlock isCentered={false} noPadding={true}>
                <InProgressWorkout workoutDetails={inProgressWorkout} />
            </ContentBlock>
            }
            {previousWorkouts}
            <div className={styles.previousWorkouts__footer}>
            {
                periodKeysData.keyData.length > periodKeysData.currentShowing ? 
                <button className="button button--alt" onClick={handleLoadMore}>Load more</button> :
                <p>{noWorkouts}</p>
            }
            </div>
        </>
    )
}

export default PreviousWorkouts;