import React, { FC, ReactElement } from 'react'

import { FormObject } from '@/domain/models'

// components
import { Box } from '@/infrastructure/ui/components'
import {
    CardAboutMeIntro,
    CardEducation,
    CardService,
    CardSpecialties,
    CardTools,
} from '@/infrastructure/ui/modules/AboutMeModule/inc'

export interface CardInformationProps {
    aboutMeTitle: FormObject
    aboutMeResume: FormObject
    aboutMeProfileItemList: FormObject
    aboutMeServices: FormObject
}

const CardInformation: FC<CardInformationProps> = ({
    aboutMeTitle,
    aboutMeResume,
    aboutMeProfileItemList,
    aboutMeServices,
}): ReactElement => {
    return (
        <Box
            sx={(theme) => ({
                height: { md: '88vh' },
                width: { xs: '100%', md: 'calc(100% - 28rem)' },
                margin: { xs: '16px 0 80px', md: '0' },
                padding: { xs: '16px', lg: '32px' },
                borderRadius: '4px',
                boxSizing: 'border-box',
                boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                backgroundColor: '#FFFFFF',
                overflowY: {
                    md: 'scroll',
                },
            })}
        >
            <CardAboutMeIntro
                aboutMeTitle={aboutMeTitle}
                aboutMeResume={aboutMeResume}
                aboutMeProfileItemList={aboutMeProfileItemList}
            />
            <CardService aboutMeServices={aboutMeServices} />
            <CardSpecialties />
            <CardTools />
            <CardEducation />
        </Box>
    )
}

export default CardInformation
