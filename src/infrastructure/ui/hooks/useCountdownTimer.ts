/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react'

const MAX_VALUE = 100

export const useCountdownTimer = (
    initialValue = 10,
    step = 10,
    callback?: (progress?: number) => void,
): number[] => {
    const [progress, setProgress] = useState(initialValue)
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setProgress((prevProgress) => {
                if (prevProgress >= MAX_VALUE) return MAX_VALUE
                return prevProgress + step
            })
        }, 800)
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [])

    useEffect(() => {
        if (progress >= MAX_VALUE) {
            if (timerRef.current) clearInterval(timerRef.current)
            if (callback) callback(progress)
        }
    }, [progress])

    return [progress]
}
