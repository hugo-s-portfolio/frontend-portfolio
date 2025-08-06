/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// base components
import {
    CardAboutMeIntro,
    CardEducation,
    CardProfile,
    CardService,
    CardSpecialties,
    CardTools,
    CardWrapper,
    CardWrapperSkeleton,
} from '@/infrastructure/ui/modules/AboutMeModule/inc'

// styles
import {
    StyleAboutMeView,
    StyledCardProfile,
} from '@/infrastructure/ui/modules/AboutMeModule/views/AboutMeView/aboutMeView-style'

// models
import { AboutMeMenuConfig, ConfigModuleModel, Countries } from '@/domain/models'
import { onLoadAboutMeMenu } from '@/domain/store/homeUseCase/homeMenu/thunk'

// utils
import { findMenu, getCookie } from '@/infrastructure/ui/utils/finders'

// store
import { AppDispatch } from '@/domain/store/store'
import { homeMenuSelector, HomeMenuState } from '@/domain/store/homeUseCase'

// enums
import { AboutMeMenu } from '@/infrastructure/ui/modules/AboutMeModule/enums'

export interface AboutMeViewProps {
    config?: ConfigModuleModel
    status?: 'SUCCESS' | 'ERROR'
}

const TIMEOUT = 4 * 60 * 60 * 1000

const AboutMeView: FC<AboutMeViewProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')
    const { options, loading, error, timestamp } = useSelector(homeMenuSelector) as HomeMenuState

    const aboutMeIntroMenu = findMenu(options, 'about_me_intro')
    const aboutMeDescription = findMenu(options, 'about_me_description')
    const aboutMeServicesMenu = findMenu(options, 'about_me_services')
    const aboutMeSpecialties = findMenu(options, 'about_me_specialties')
    const aboutMeTools = findMenu(options, 'about_me_tools')
    const aboutMeEducation = findMenu(options, 'about_me_education')

    const validationSections = (options: AboutMeMenuConfig[]): boolean =>
        options?.filter((menu) => menu.menuName === 'about_me_intro')?.some((menu) => menu.enable)

    useEffect(() => {
        const cacheValid = Boolean(timestamp && Date.now() - timestamp < TIMEOUT)

        if (token && !cacheValid) {
            dispatch(
                onLoadAboutMeMenu({
                    country: Countries.CO,
                    token,
                    menuType: AboutMeMenu.MenuAboutMe,
                }),
            )
        }
    }, [])

    return (
        <StyleAboutMeView>
            <StyledCardProfile>
                {error !== null ? (
                    <p>Hay un error!</p>
                ) : (
                    <>
                        {!loading ? (
                            <>
                                {aboutMeIntroMenu?.enable && <CardProfile />}
                                {validationSections(options) && (
                                    <CardWrapper>
                                        {aboutMeDescription?.enable && <CardAboutMeIntro />}
                                        {aboutMeServicesMenu?.enable && <CardService />}
                                        {aboutMeSpecialties?.enable && <CardSpecialties />}
                                        {aboutMeTools?.enable && <CardTools />}
                                        {aboutMeEducation?.enable && <CardEducation />}
                                    </CardWrapper>
                                )}
                            </>
                        ) : (
                            <CardWrapperSkeleton />
                        )}
                    </>
                )}
            </StyledCardProfile>
        </StyleAboutMeView>
    )
}

export default AboutMeView
