export const generateStorageKey = (month: number, year: number) => {
    return `workouts_${month}_${year}`;
}