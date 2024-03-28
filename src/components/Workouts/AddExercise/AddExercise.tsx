import ContentBlock from "../../Generic/ContentBlock/ContentBlock";

type Props = {
    handleAdd: () => void;
}

const AddExercise = ({ handleAdd }: Props) => {
    
    return (
        <ContentBlock isCentered={true}>
            <button className="button bgBlue" onClick={handleAdd}>Add Exercise</button>
        </ContentBlock>
    )
}

export default AddExercise;