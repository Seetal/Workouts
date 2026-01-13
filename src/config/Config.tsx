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
    daysThresholdPreviousWorkouts: 10,
    countdownTimerOptions: [
        { keyId: 'ct-1', label: '1', id: '1', value: 1},
        { keyId: 'ct-2', label: '2', id: '2', value: 2},
        { keyId: 'ct-3', label: '3', id: '3', value: 3},
        { keyId: 'ct-4', label: '4', id: '4', value: 4},
        { keyId: 'ct-5', label: '5', id: '5', value: 5},
    ]
}