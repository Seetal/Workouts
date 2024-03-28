import { createContext, useState, useEffect } from "react";
import { WorkoutType } from "../types/WorkoutType";

type WorkoutContextType = {
    savedWorkouts: WorkoutType[] | null;
}

const WorkoutsContext = createContext<WorkoutContextType>({
    savedWorkouts: null
});

const WorkoutsContextProvider = ({ children }: { children: JSX.Element}) => {

};

export { WorkoutsContextProvider, WorkoutsContext };