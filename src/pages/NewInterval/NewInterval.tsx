import { useContext, useState } from "react";
import RadioList from "../../components/Form-Elements/RadioList/RadioList";
import ContentBlock from "../../components/Generic/ContentBlock/ContentBlock";
import TextInput from "../../components/Form-Elements/TextInput/TextInput";
import IntervalSubmitted from "../../components/Intervals/IntervalSubmitted/IntervalSubmitted";
import NewIntervalSummary from "../../components/Intervals/NewIntervalSummary/NewIntervalSummary";
import styles from './NewInterval.module.scss';
import { Config } from "../../config/Config";
import { NewIntervalInitialData } from "../../data/NewIntervalInitialData";
import { IntervalsContext } from "../../context/IntervalsContext";
import { IntervalType } from "../../types/IntervalType";
import DuplicateInterval from "../../components/Intervals/DuplicateInterval/DuplicateInterval";
import { generateCode } from "./NewInterval.helpers";
import { nanoid } from "nanoid";
import Modal from "../../components/Generic/Modal/Modal";
import { ModalContext } from "../../components/Generic/Modal/ModalContext";

type Duplicate = {
    isDuplicate: boolean;
    oldItem: null | IntervalType;
    newItem: null | IntervalType;
}

type IntervalSubmittedType = {
    isSubmitted: boolean;
    addedInterval: IntervalType;
}

const initialState = {
    isSubmitted: false, 
    addedInterval: {
        id: '',
        created: '',
        name: '',
        lastUsed: '',
        work: 0,
        rest: 0,
        rounds: 0,
        sets: 0,
        code: '',
        isNew: false
    }
}

const NewInterval = () => {
    const { savedIntervals, handleAddInterval } = useContext(IntervalsContext);
    const { handleFadeOn } = useContext(ModalContext);
    const [newIntervalData, setNewIntervalData] = useState(NewIntervalInitialData);
    const [duplicate, setDuplicate] =  useState<Duplicate>({ isDuplicate: false, oldItem: null, newItem: null });
    const [intervalSubmitted, setIntervalSubmitted] = useState<IntervalSubmittedType>(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as keyof typeof newIntervalData;
        const value = e.target.value;
        const isValid = (name === 'name' && value.length < 1) ? false : true;
        setNewIntervalData(prevState => {
            return ({...prevState, [name]: {...newIntervalData[name], value: value, valid: isValid, isValidationVisible: false }});
        })
    }

    const addHandler = () => {
        let counter = 0;
        const newIntervalValues: IntervalType = {
            id: '',
            name: '',
            lastUsed: 'Not used',
            created: '',
            work: 0,
            rest: 0,
            rounds: 0,
            sets: 0,
            code: '',
            isNew: true
        };
        for (const [key, value] of Object.entries(newIntervalData)) {
            if(!value.valid) {
                setNewIntervalData(prevState => {
                    return ({...prevState, [key]: { ...value, isValidationVisible: true }});
                })
            } else {
                counter++;
                //@ts-ignore
                key != 'name' ? newIntervalValues[key] = Number(value.value) : newIntervalValues[key] = value.value
            }
        }
        if (counter === 5) {
            const intervalCode = generateCode(
                {work: newIntervalValues.work, rest: newIntervalValues.rest, rounds: newIntervalValues.rounds, sets: newIntervalValues.sets}
            )
            newIntervalValues.code = intervalCode;
            newIntervalValues.id = nanoid();
            const date = new Date();
            newIntervalValues.created = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            const duplicateCheck = savedIntervals.find((interval) => interval.code === intervalCode);
            if (!duplicateCheck) {
                handleAddInterval(newIntervalValues);
                setIntervalSubmitted({ isSubmitted: true, addedInterval: newIntervalValues });
            } else {
                handleFadeOn();
                setDuplicate({ isDuplicate: true, oldItem: duplicateCheck, newItem: newIntervalValues});
            }
        }
    }

    const handleCloseModal = () => {
        setDuplicate({ isDuplicate: false, oldItem: null, newItem: null});
    }

    const pageColors = { '--page-color': 'var(--clr-green)', '--page-color-secondary': 'var(--clr-green-secondary)' } as React.CSSProperties;

    return (
        <main className={styles.newInterval} style={pageColors}>
            {
                intervalSubmitted.isSubmitted ? <IntervalSubmitted newInterval={intervalSubmitted.addedInterval}/> :
                <>
                    <div className={styles.newInterval__form}>
                        <ContentBlock isCentered={false}>
                            <TextInput 
                                label="New interval name" 
                                id="intervalName" 
                                name="name" 
                                isValidationVisible={newIntervalData.name.isValidationVisible} 
                                validationText={newIntervalData.name.validationText} 
                                value={newIntervalData.name.value}  
                                handler={handleChange}/>
                        </ContentBlock>
                        <ContentBlock isCentered={false}>
                            <RadioList option={Config.newInterval.maxWork} accumulator={5} name="work" legend="Work length (secs)" handler={handleChange} newIntervalData={newIntervalData.work}/>
                        </ContentBlock>
                        <ContentBlock isCentered={false}>
                            <RadioList option={Config.newInterval.maxRest} accumulator={5} name="rest" legend="Rest length (secs)" handler={handleChange} newIntervalData={newIntervalData.rest}/>
                        </ContentBlock>
                        <ContentBlock isCentered={false}>
                            <RadioList option={Config.newInterval.maxRounds} accumulator={1} name="rounds" legend="Number of rounds" handler={handleChange} newIntervalData={newIntervalData.rounds}/>
                        </ContentBlock>
                        <ContentBlock isCentered={false}>
                            <RadioList option={Config.newInterval.maxSets} accumulator={1} name="sets" legend="Number of sets"  handler={handleChange} newIntervalData={newIntervalData.sets}/>
                        </ContentBlock>
                    </div>
                    <NewIntervalSummary data={newIntervalData} addHandler={addHandler}/>
                </>
            }
            {
                (duplicate.isDuplicate && duplicate.oldItem && duplicate.newItem) && (
                    <Modal handleClose={handleCloseModal} title={'Duplicate Interval'}>
                        <DuplicateInterval oldItem={duplicate.oldItem} newItem={duplicate.newItem} submitted={setIntervalSubmitted} closeModal={handleCloseModal} />
                    </Modal>
                )
            }
        </main>
    )
}

export default NewInterval;