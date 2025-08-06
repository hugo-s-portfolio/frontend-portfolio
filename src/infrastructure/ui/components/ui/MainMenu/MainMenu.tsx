/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

// components
import { DesktopMenu, MainMenuSkeleton, MobileMenu } from '@/infrastructure/ui/components/ui'

// models
import { Countries } from '@/domain/models'

// store
import { onLoadTabsMainMenu } from '@/domain/store/contentUseCase/tabsMenu/thunk'
import { AppDispatch } from '@/domain/store/store'
import { menuMobileOptionSelector, TabsMenuState } from '@/domain/store/contentUseCase'

// utils
import { getCookie } from '@/infrastructure/ui/utils/finders'

export interface MainMenuProps {
    initialValue?: number
}

const TIMEOUT = 4 * 60 * 60 * 1000

const MainMenu: FC<MainMenuProps> = ({ initialValue = 0 }): ReactElement => {
    const pathname = usePathname()
    const dispatch: AppDispatch = useDispatch()
    const [value, setValue] = useState(initialValue)
    const token = getCookie('session')

    const { options, loading, error, timestamp } = useSelector(
        menuMobileOptionSelector,
    ) as TabsMenuState

    const setInitialTab = (): void => {
        const routes = options?.map((opt) => ({
            route: opt?.route,
            index: opt?.menuId,
        }))

        routes.find(({ route, index }) => {
            if (route === pathname && index) {
                setValue(index)
            }
        })
    }

    useEffect(() => {
        const cacheValid = Boolean(timestamp && Date.now() - timestamp < TIMEOUT)

        if (token && !cacheValid) {
            dispatch(
                onLoadTabsMainMenu({
                    country: Countries.CO,
                    menuType: 'module_tabs',
                }),
            )
        }
    }, [])

    useEffect(() => {
        setInitialTab()
    }, [pathname])

    return (
        <>
            {error !== null && <p>Hay un error</p>}
            {!loading ? (
                <>
                    {pathname !== '/' && (
                        <>
                            <MobileMenu options={options} initialValue={value} />
                            <DesktopMenu options={options} />
                        </>
                    )}
                </>
            ) : (
                <MainMenuSkeleton />
            )}
        </>
    )
}

export default MainMenu
