import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";
import IntervalItem from "../components/Intervals/IntervalItem/IntervalItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { IntervalsContext } from "../context/IntervalsContext";
import { sortByDate } from "../utilities/SortByDate";

const IntervalsPage = () => {

    const { savedIntervals } = useContext(IntervalsContext);
    const dateSortedIntervals = sortByDate(savedIntervals);
    const intervals = dateSortedIntervals?.map((item, i) => {
        const currentDelay = 200 * i;
        return (
            <li key={item.id} className="box-list__item">
                <ContentBlock key={item.id} isCentered={false} isFadeOn={true} fadeDelay={currentDelay} noPadding={true}>
                    <IntervalItem {...item} />
                </ContentBlock>
            </li>
        )
    })

    const pageColors = { '--page-color': 'var(--clr-green)', '--page-color-secondary': 'var(--clr-green-secondary)' } as React.CSSProperties;
    return (
        <main style={pageColors}>
            <div className="create-box">
                <Link to="/intervals/new" className="button bgGreen">Create New Interval</Link>
            </div>
            <ul className="box-list">
                {intervals}
            </ul>
        </main>
    )
}

export default IntervalsPage;