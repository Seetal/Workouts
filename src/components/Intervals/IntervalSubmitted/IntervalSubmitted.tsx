import ContentBlock from "../../Generic/ContentBlock/ContentBlock";
import { IntervalType } from "../../../types/IntervalType";
import { Link } from "react-router-dom";

type Props = {
    newInterval: IntervalType
}

const IntervalSubmitted = ({newInterval}: Props) => {
    return (
        <ContentBlock isCentered={true}>
            <h2 className="title-1">New Interval <span className="highlight">'{newInterval.name}'</span> added</h2> 
            <div className="button-row">
                <Link to={`/intervals/${newInterval.id}`} className="button bgGreen">
                    Use new interval
                </Link>
            </div>
        </ContentBlock>
    )
}

export default IntervalSubmitted;