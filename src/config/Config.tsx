export const Config = {
    navData: [
        {
            label: 'Intervals',
            textColor: 'green',
            to: "/intervals",
            id: 2
        },
        {
            label: 'Workouts',
            textColor: 'blue',
            to: "/workouts",
            id: 3
        }
    ],
    newInterval: {
        maxWork: 60,
        maxRest: 60,
        maxRounds: 12,
        maxSets: 12
    },
    getReadyTime: 10,
    setRestTime: 60,
    coolDownTime: 10,
    timerCircumference: 829.38,
    // Number of days into months, if less than this then also show previous months workouts
    daysThresholdPreviousWorkouts: 10
}