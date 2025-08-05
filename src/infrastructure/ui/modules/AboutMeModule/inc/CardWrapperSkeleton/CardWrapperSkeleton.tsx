import React, { ReactElement } from 'react'

// incs
import {
    CardAboutMeEducationSkeleton,
    CardAboutMeIntroSkeleton,
    CardAboutMeServicesSkeleton,
    CardAboutMeSpecialtiesSkeleton,
    CardAboutMeToolsSkeleton,
    CardProfileSkeleton,
    CardWrapper,
} from '..'

const CardWrapperSkeleton = (): ReactElement => (
    <>
        <CardProfileSkeleton />
        <CardWrapper>
            <CardAboutMeIntroSkeleton />
            <CardAboutMeServicesSkeleton />
            <CardAboutMeSpecialtiesSkeleton />
            <CardAboutMeToolsSkeleton />
            <CardAboutMeEducationSkeleton />
        </CardWrapper>
    </>
)

export default CardWrapperSkeleton
