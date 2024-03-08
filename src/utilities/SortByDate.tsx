import { IntervalType } from "../types/IntervalType";

export const sortByDate = (array: IntervalType[]) => {
    array.sort(function(a, b) {
        const dateA = a.isNew ? new Date(a.created) : new Date(a.lastUsed);
        const dateB = b.isNew ? new Date(b.created) : new Date(b.lastUsed);
        
        return dateB - dateA;
    })

    return array;
}