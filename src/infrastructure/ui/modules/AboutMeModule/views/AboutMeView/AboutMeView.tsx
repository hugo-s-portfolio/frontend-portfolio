/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// base components
import {
    CardAboutMeIntro,
    CardEducation,
    CardProfile,
    CardProfileSkeleton,
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
import { ConfigModuleModel } from '@/domain/models'
import { onLoadAboutMeMenu } from '@/domain/store/homeUseCase/homeMenu/thunk'

// utils
import { findMenu, getCookie } from '@/infrastructure/ui/utils/finders'

// store
import { AppDispatch } from '@/domain/store/store'
import { homeMenuSelector, HomeMenuState } from '@/domain/store/homeUseCase'

export interface AboutMeViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

const AboutMeView: FC<AboutMeViewProps> = ({ config }): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')
    const { options, loading, error } = useSelector(homeMenuSelector) as HomeMenuState

    const aboutMeIntroMenu = findMenu(options, 'about_me_intro')
    const aboutMeDescription = findMenu(options, 'about_me_description')
    const aboutMeServicesMenu = findMenu(options, 'about_me_services')
    const aboutMeSpecialties = findMenu(options, 'about_me_specialties')
    const aboutMeTools = findMenu(options, 'about_me_tools')
    const aboutMeEducation = findMenu(options, 'about_me_education')

    const validationSections =
        aboutMeDescription?.enable ||
        aboutMeServicesMenu?.enable ||
        aboutMeSpecialties?.enable ||
        aboutMeTools?.enable ||
        aboutMeEducation?.enable

    useEffect(() => {
        if (token) {
            dispatch(
                onLoadAboutMeMenu({
                    country: 'CO',
                    token,
                    menuType: 'menu_about_me',
                }),
            )
        }
    }, [])

    return (
        <StyleAboutMeView>
            <StyledCardProfile>
                {error !== null && <p>Hay un error!</p>}
                {!loading ? (
                    <>
                        {aboutMeIntroMenu?.enable && (
                            <CardProfile
                                aboutMeCard={config?.forms?.about_me_card}
                                aboutMeName={config?.forms?.about_me_name}
                                aboutMeJob={config?.forms?.about_me_job}
                                aboutMeDescription={config?.forms?.about_me_description}
                                aboutMeLocation={config?.forms?.about_me_location}
                                aboutMeSocialMedia={config?.actions?.about_me_social_media}
                            />
                        )}
                        {validationSections && (
                            <CardWrapper>
                                {aboutMeDescription?.enable && (
                                    <CardAboutMeIntro
                                        aboutMeTitle={config?.forms?.about_me_title}
                                        aboutMeResume={config?.forms?.about_me_resume}
                                        aboutMeProfileItemList={
                                            config?.forms?.about_me_profile_item_list
                                        }
                                    />
                                )}
                                {aboutMeServicesMenu?.enable && (
                                    <CardService
                                        aboutMeServices={config?.forms?.about_me_services}
                                    />
                                )}
                                {aboutMeSpecialties?.enable && <CardSpecialties />}
                                {aboutMeTools?.enable && <CardTools />}
                                {aboutMeEducation?.enable && <CardEducation />}
                            </CardWrapper>
                        )}
                    </>
                ) : (
                    <>
                        <CardProfileSkeleton />
                        <CardWrapperSkeleton />
                    </>
                )}
            </StyledCardProfile>
        </StyleAboutMeView>
    )
}

export default AboutMeView
