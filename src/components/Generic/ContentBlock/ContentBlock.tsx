import styles from './ContentBlock.module.scss'

type Props = {
    children: React.ReactNode
    isCentered: boolean
    isFadeOn?: boolean
    fadeDelay?: number
}

const ContentBlock = ( { children, isCentered, isFadeOn = false, fadeDelay }: Props ) => {


    return (
        <article className={`
            ${styles.contentBlock} 
            ${isCentered && styles.centered} 
            ${isFadeOn && styles.faded}
            ${isFadeOn && 'fade-on'}
        `} style={{'--fade-delay': `${fadeDelay}ms` } as React.CSSProperties}>
            {children}
        </article>
    )
}

export default ContentBlock;