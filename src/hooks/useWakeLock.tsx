import {
    useCallback, useEffect, useMemo, useRef, useState, MutableRefObject,
} from 'react'

export default function useWakeLock(): {
  isSupported: boolean
  allowWakeLock: () => Promise<void>
  disableWakeLock: () => Promise<void>
  isEnable: boolean
} {
    /** Is wake lock enable */
    const [isEnable, setIsEnable] = useState(false)

    const wakeLock: MutableRefObject<WakeLockSentinel | null> = useRef(null)

    /** Is wake lock API supported */
    const isSupported = useMemo(() => typeof window !== 'undefined' && 'wakeLock' in navigator, [])

    /** On release callback */
    const onRelease = useCallback(() => {
        wakeLock.current = null
    }, [])

    /** Allow wake lock */
    const allowWakeLock = useCallback(async () => {
        if (!isSupported || wakeLock.current)
            return

        try {
            wakeLock.current = await navigator.wakeLock.request('screen')
            setIsEnable(true)
            wakeLock.current.addEventListener('release', onRelease)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }, [isSupported, onRelease])

    /** Disable wake lock */
    const disableWakeLock = useCallback(async () => {
        if (!isSupported || !wakeLock.current)
            return

        try {
            await wakeLock.current.release()
            setIsEnable(false)
            wakeLock.current?.removeEventListener('release', onRelease)
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error)
        }
    }, [isSupported, onRelease])

    // Remove listener on wakeLock when unmount
    useEffect(() => () => {
        wakeLock.current?.removeEventListener('release', onRelease)
    }, [onRelease])

    // Handle listener when page is going back visible
    useEffect(() => {
        const onVisibilitychange = async () => {
            if (isEnable && document.visibilityState === 'visible')
                await allowWakeLock()
        }

        document.addEventListener('visibilitychange', onVisibilitychange)

        return () => {
            document.removeEventListener('visibilitychange', onVisibilitychange)
        }
    }, [isEnable, allowWakeLock])

    return {
        isSupported,
        allowWakeLock,
        disableWakeLock,
        isEnable,
    }
}