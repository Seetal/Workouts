import { createContext, useState, useEffect } from "react";
import { IntervalsData } from "../data/IntervalsData";
import { IntervalType } from "../types/IntervalType";

type IntervalsContextType = {
    savedIntervals: IntervalType[];
    handleAddInterval: (newInterval: IntervalType) => void;
    handleUpdateInterval: (updatedInterval: IntervalType) => void;
}

const IntervalsContext = createContext<IntervalsContextType>({
    savedIntervals: [{
        id: '1',
        created: '5/02/2024',
        name: 'Basic Routine',
        lastUsed: '5/02/2024',
        work: 20,
        rest: 10,
        rounds: 3,
        sets: 3,
        code: '20100303',
        isNew: false
    }],
    handleAddInterval: () => {},
    handleUpdateInterval: () => {}
});

const IntervalsContextProvider = ({ children }: { children: JSX.Element }) => {

    const [savedIntervals, setSavedIntervals] = useState<IntervalType[]>(
        // JSON.parse expects type string but localstorage returns type string or null so empty string is required
        () => JSON.parse(localStorage.getItem('intervals') || '""' ) || IntervalsData
    );
    useEffect(() => {
        localStorage.setItem('intervals', JSON.stringify(savedIntervals));
    }, [savedIntervals]);

    const handleAddInterval = (newInterval: IntervalType) => {
        setSavedIntervals((prevState: IntervalType[]) => {
            return [...prevState, newInterval]
        })
    }

    const handleUpdateInterval = (updatedInterval: IntervalType) => {
        const newDate = new Date();
        const lastUsed = `${newDate.getFullYear()}/${newDate.getMonth() + 1}/${newDate.getDate()}`
        console.log('last used', lastUsed);
        setSavedIntervals(savedIntervals.map((interval) => {
            if(interval.id === updatedInterval.id) {
                return { ...interval, isNew: false, lastUsed: lastUsed}
            }
            return interval;
        }))
    }

    return (
        <IntervalsContext.Provider value={{ savedIntervals, handleAddInterval, handleUpdateInterval }}>
            {children}
        </IntervalsContext.Provider>
    )
};

export { IntervalsContextProvider, IntervalsContext };