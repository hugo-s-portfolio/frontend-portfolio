/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

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
import { ErrorCard } from '@/infrastructure/ui/components'

// styles
import {
    StyleAboutMeView,
    StyledCardProfile,
} from '@/infrastructure/ui/modules/AboutMeModule/views/AboutMeView/aboutMeView-style'

// models
import { AboutMeMenuConfig, ConfigModuleModel, Countries } from '@/domain/models'
import { AppDispatch } from '@/domain/store/store'

// utils
import { findMenu } from '@/infrastructure/ui/utils/finders'

// store
import { onLoadAboutMeMenu } from '@/domain/store/homeUseCase/homeMenu/thunk'
import {
    homeMenuSelector,
    HomeMenuState,
    onHideToastErrorHomeMenu,
} from '@/domain/store/homeUseCase'

// enums
import { AboutMeMenu } from '@/infrastructure/ui/modules/AboutMeModule/enums'
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

export interface AboutMeViewProps {
    config?: ConfigModuleModel
    status?: 'SUCCESS' | 'ERROR'
}

export enum MenuItem {
    aboutMeIntro = 'about_me_intro',
    aboutMeDescription = 'about_me_description',
    aboutMeServices = 'about_me_services',
    aboutMeSpecialties = 'about_me_specialties',
    aboutMeTools = 'about_me_tools',
    aboutMeEducation = 'about_me_education',
}

export interface MenuOptions {
    menu: AboutMeMenuConfig
    component: ReactElement
}

const menu = [
    {
        key: MenuItem.aboutMeDescription,
        component: CardAboutMeIntro,
    },
    {
        key: MenuItem.aboutMeServices,
        component: CardService,
    },
    {
        key: MenuItem.aboutMeSpecialties,
        component: CardSpecialties,
    },
    {
        key: MenuItem.aboutMeTools,
        component: CardTools,
    },
    {
        key: MenuItem.aboutMeEducation,
        component: CardEducation,
    },
]

const AboutMeView: FC<AboutMeViewProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const [mainMenuOptions, setMainMenuOptions] = useState<MenuOptions[]>([])

    const {
        config: options,
        loading,
        error,
        errorShow,
    } = useGetModuleConfig<HomeMenuState>({
        selector: homeMenuSelector,
        thunkAction: onLoadAboutMeMenu({
            country: Countries.CO,
            menuType: AboutMeMenu.MenuAboutMe,
        }),
    })

    const aboutMeIntroMenu = findMenu(options, MenuItem.aboutMeIntro)

    const orderedAboutMeSection = (): void => {
        const result = menu.map(({ key, component: Component }) => {
            const opt = findMenu(options, key)
            return { menu: opt, component: <Component /> }
        })

        setMainMenuOptions(result)
    }

    const validationSections = (options: AboutMeMenuConfig[]): boolean =>
        options
            ?.filter((menu) => menu.menuName === MenuItem.aboutMeIntro)
            ?.some((menu) => menu.enable)

    const renderOptionList = (): ReactElement => {
        const newOptions = mainMenuOptions
            ?.slice()
            ?.sort((a, b) => (a.menu?.order ?? 1) - (b.menu?.order ?? 1))
            .map(({ menu, component }) =>
                menu?.enable ? React.cloneElement(component, { key: menu.id }) : null,
            )

        return (
            <>
                {aboutMeIntroMenu?.enable && <CardProfile />}
                {validationSections(options) && (
                    <CardWrapper>{mainMenuOptions?.length > 0 && <>{newOptions}</>}</CardWrapper>
                )}
            </>
        )
    }

    useEffect(() => {
        orderedAboutMeSection()
    }, [options])

    return (
        <StyleAboutMeView>
            <StyledCardProfile>
                {error !== null ? (
                    <>
                        <ErrorCard
                            error={error}
                            showError={errorShow}
                            componentName="ProjectsView"
                            onClose={() => {
                                dispatch(onHideToastErrorHomeMenu())
                            }}
                        />
                        <CardWrapperSkeleton />
                    </>
                ) : (
                    <>{!loading ? renderOptionList() : <CardWrapperSkeleton />}</>
                )}
            </StyledCardProfile>
        </StyleAboutMeView>
    )
}

export default AboutMeView
