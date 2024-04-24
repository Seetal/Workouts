import styles from './ContentBlock.module.scss'

type Props = {
    children: React.ReactNode
    isCentered?: boolean
    isFadeOn?: boolean
    fadeDelay?: number
    noPadding?: boolean
}

const ContentBlock = ( { children, isCentered = false, isFadeOn = false, fadeDelay, noPadding = false }: Props ) => {


    return (
        <article className={`
            ${styles.contentBlock} 
            ${isCentered ? styles.centered : ''} 
            ${isFadeOn && styles.faded}
            ${isFadeOn && 'fade-on'}
            ${noPadding && styles.noPadding}
        `} style={{'--fade-delay': `${fadeDelay}ms` } as React.CSSProperties}>
            {children}
        </article>
    )
}

export default ContentBlock;