export const lastUsedFormatted = (lastUsed: string) => {
    if(lastUsed === 'Not used') {
        return 'Not used';
    } else {
        const newDate = new Date(lastUsed);
        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;
    }
}