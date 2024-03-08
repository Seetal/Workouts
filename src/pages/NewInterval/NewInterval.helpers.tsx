type Props = {
    work: number;
    rest: number;
    rounds: number;
    sets: number;
}

export const generateCode = ({work, rest, rounds, sets}: Props) => {
    const addZero = (value: number) => {
        const updatedValue = value < 10 ? `0${value}`: `${value}`;
        return updatedValue;
    }
    const intervalCode = `${addZero(work)}${addZero(rest)}${addZero(rounds)}${addZero(sets)}`;
    return intervalCode;
}