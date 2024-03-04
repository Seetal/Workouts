import Button from "../components/Generic/Button/Button";
import ContentBlock from "../components/Generic/ContentBlock/ContentBlock";

const WorkoutsPage = () => {
    const pageColor = { '--page-color': 'var(--clr-blue)' } as React.CSSProperties;
    return (
        <main style={pageColor}>
            <ContentBlock isCentered={true}>
                <Button label="Start New Workout" color='Blue' />
            </ContentBlock>
        </main>
    )
}

export default WorkoutsPage;