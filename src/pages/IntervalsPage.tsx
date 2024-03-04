import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";
import IntervalItem from "../components/Intervals/IntervalItem/IntervalItem";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { IntervalsContext } from "../context/IntervalsContext";

const IntervalsPage = () => {

    const { savedIntervals } = useContext(IntervalsContext)
    const intervals = savedIntervals?.map((item, i) => {
        const currentDelay = 200 * i;
        return (
            <ContentBlock key={nanoid()} isCentered={false} isFadeOn={true} fadeDelay={currentDelay}>
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