import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";
import IntervalItem from "../components/Intervals/IntervalItem/IntervalItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IntervalsContext } from "../context/IntervalsContext";
import { sortByDate } from "../utilities/SortByDate";

const IntervalsPage = () => {

    const { savedIntervals } = useContext(IntervalsContext)
    
    const dateSortedIntervals = sortByDate(savedIntervals);
    const intervals = dateSortedIntervals?.map((item, i) => {
        const currentDelay = 200 * i;
        return (
            <ContentBlock key={item.id} isCentered={false} isFadeOn={true} fadeDelay={currentDelay}>
                <IntervalItem {...item} />
            </ContentBlock>
        )
    })

    const pageColor = { '--page-color': 'var(--clr-green)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            <ContentBlock isCentered={true}>
                <Link to="/intervals/new" className="button bgGreen">Create New Interval</Link>
            </ContentBlock>
            {intervals}
        </main>
    )
}

export default IntervalsPage;