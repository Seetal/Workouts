export const Config = {
    navData: [
        {
            label: 'Home',
            textColor: 'red',
            to: "/",
            id: 1
        },
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
        },
        // {
        //     label: 'Stats',
        //     textColor: 'orange',
        //     to: "/stats",
        //     id: 4
        // }
    ],
    newInterval: {
        maxWork: 60,
        maxRest: 60,
        maxRounds: 12,
        maxSets: 12
    },
    getReadyTime: 10,
    setRestTime: 3,
    coolDownTime: 3,
    timerCircumference: 829.38
}