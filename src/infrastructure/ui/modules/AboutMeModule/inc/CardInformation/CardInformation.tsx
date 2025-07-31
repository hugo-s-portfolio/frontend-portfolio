import React, { FC, ReactElement } from 'react'

import { AboutMeMenuConfig, FormObject } from '@/domain/models'

// components
import { Box } from '@/infrastructure/ui/components'
import {
    CardAboutMeIntro,
    CardEducation,
    CardService,
    CardSpecialties,
    CardTools,
} from '@/infrastructure/ui/modules/AboutMeModule/inc'
import { findMenu } from '@/infrastructure/ui/utils/finders'

export interface CardInformationProps {
    aboutMeTitle: FormObject
    aboutMeResume: FormObject
    aboutMeProfileItemList: FormObject
    aboutMeServices: FormObject
    aboutMeMenu: AboutMeMenuConfig[]
}

const CardInformation: FC<CardInformationProps> = ({
    aboutMeTitle,
    aboutMeResume,
    aboutMeProfileItemList,
    aboutMeServices,
    aboutMeMenu,
}): ReactElement => {
    const aboutMeDescription = findMenu(aboutMeMenu, 'about_me_description')
    const aboutMeServicesMenu = findMenu(aboutMeMenu, 'about_me_services')
    const aboutMeSpecialties = findMenu(aboutMeMenu, 'about_me_specialties')
    const aboutMeTools = findMenu(aboutMeMenu, 'about_me_tools')
    const aboutMeEducation = findMenu(aboutMeMenu, 'about_me_education')

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
            {aboutMeDescription?.enable && (
                <CardAboutMeIntro
                    aboutMeTitle={aboutMeTitle}
                    aboutMeResume={aboutMeResume}
                    aboutMeProfileItemList={aboutMeProfileItemList}
                />
            )}
            {aboutMeServicesMenu?.enable && <CardService aboutMeServices={aboutMeServices} />}
            {aboutMeSpecialties?.enable && <CardSpecialties />}
            {aboutMeTools?.enable && <CardTools />}
            {aboutMeEducation?.enable && <CardEducation />}
        </Box>
    )
}

export default CardInformation
