/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

const MAX_VALUE = 100

export const useCountdownTimer = (
    initialValue = 10,
    step = 10,
    callback?: (progress?: number) => void,
): number[] => {
    const [progress, setProgress] = useState(initialValue)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= MAX_VALUE ? 0 : prevProgress + step))
        }, 800)
        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        if (progress === MAX_VALUE && callback) {
            callback(progress)
        }
    }, [progress])

    return [progress]
}
