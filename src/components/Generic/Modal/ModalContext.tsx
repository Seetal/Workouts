import { createContext, useState } from "react";


const ModalContext = createContext({
    handleFadeOff: () => {},
    handleFadeOn: () => {},
    fadeOff: false
});

const ModalContextProvider = ({children}: { children: JSX.Element }) => {

    const [fadeOff, setFadeOff] = useState(false);

    const handleFadeOff = () => {
        setFadeOff(true);
    }

    const handleFadeOn = () => {
        setFadeOff(false);
    }

    return (
        <ModalContext.Provider value={{ handleFadeOff, handleFadeOn, fadeOff }}>
            {children}
        </ModalContext.Provider>
    )

}

export { ModalContext, ModalContextProvider };