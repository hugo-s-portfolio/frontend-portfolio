/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'

// components
import { Skeleton } from '@/infrastructure/ui/components'

export interface CardAboutMeToolsSkeletonProps {
    test?: string
}

const CardAboutMeToolsSkeleton: FC<CardAboutMeToolsSkeletonProps> = (): ReactElement => (
    <>
        <Skeleton
            animation="wave"
            variant="rectangular"
            sx={{
                width: '40%',
                height: '12px',
                borderRadius: '8px',
                marginTop: '20px',
                marginBottom: '20px',
            }}
        />
        {[1, 2, 3, 4].map((item) => (
            <Skeleton
                key={item}
                animation="wave"
                variant="rectangular"
                sx={{
                    width: '100%',
                    height: '10px',
                    borderRadius: '4px',
                    marginBottom: '5px',
                }}
            />
        ))}
    </>
)

export default CardAboutMeToolsSkeleton
