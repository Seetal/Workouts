import Button from "../components/Generic/Button/Button";
import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";
import { Link } from "react-router-dom";

const WorkoutsPage = () => {
    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            <ContentBlock isCentered={true}>
                <Link to="/workouts/new" className="button bgBlue">Create New Workout</Link>
            </ContentBlock>
        </main>
    )
}

export default WorkoutsPage;