/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// components
import { DesktopMenu, MainMenuSkeleton, MobileMenu } from '@/infrastructure/ui/components/ui'

// models
import { Countries } from '@/domain/models'

// store
import { onLoadTabsMainMenu } from '@/domain/store/contentUseCase/tabsMenu/thunk'
import { menuMobileOptionSelector, TabsMenuState } from '@/domain/store/contentUseCase'

// utils
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

export interface MainMenuProps {
    initialValue?: number
}

export enum MainMenuEnum {
    moduleTabs = 'module_tabs',
}

const MainMenu: FC<MainMenuProps> = ({ initialValue = 0 }): ReactElement => {
    const pathname = usePathname()

    const [value, setValue] = useState(initialValue)

    const {
        config: options,
        loading,
        error,
    } = useGetModuleConfig<TabsMenuState>({
        selector: menuMobileOptionSelector,
        thunkAction: onLoadTabsMainMenu({
            country: Countries.CO,
            menuType: MainMenuEnum.moduleTabs,
        }),
    })

    const setInitialTab = (): void => {
        const routes = options?.map((opt) => ({
            route: opt?.route,
            index: opt?.menuId,
        }))

        routes?.find(({ route, index }) => {
            if (route === pathname && index) {
                setValue(index)
            }
        })
    }

    useEffect(() => {
        setInitialTab()
    }, [pathname])

    return (
        <>
            {error !== null ? (
                <p>Hay un error</p>
            ) : (
                <>
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
            )}
        </>
    )
}

export default MainMenu
