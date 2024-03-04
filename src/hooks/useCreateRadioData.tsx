type Props = {
    name: string
    option: number
    accumulator: number
}

export const useCreateRadioData = ({ name, option, accumulator }: Props) => {
    const data = [];

    for(let i = 0; i < option; i += accumulator) {
        const newOptionItem = {
            label: (i + accumulator).toString(),
            id: `${name}${i}`,
            keyId: crypto.randomUUID()
        }
        data.push(newOptionItem);
    }

    return data;
}