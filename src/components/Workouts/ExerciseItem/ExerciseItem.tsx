import ContentBlock from "../../Generic/ContentBlock/ContentBlock";
import { ExerciseType } from "../../../types/ExerciseType";
import LabelValue from "../../Generic/LabelValue/LabelValue";

type Props = {
    exercise: ExerciseType
}

const ExerciseItem = ({ exercise }: Props) => {
    return (
        <ContentBlock>
            <article>
                {exercise.name}
            </article>
        </ContentBlock>
    )
}

export default ExerciseItem;