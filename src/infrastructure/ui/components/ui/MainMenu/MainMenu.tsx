import React, { FC, ReactElement } from 'react'

// components
import {
    MobileMenu,
    DesktopMenu,
    MobileMenuSkeleton,
    DesktopMenuSkeleton,
} from '@/infrastructure/ui/components/ui'

export interface MainMenuProps {
    options: Option[]
    initialValue: number
}

export interface Option {
    label: string
    fontSize: number
    icon: string
    country: string
    description?: string
    enabled: boolean
    menuId: number
    menuName: string
    menuType: string
    route: string
}

const MainMenu: FC<MainMenuProps> = ({ options, initialValue }): ReactElement => {
    return (
        <>
            {true ? (
                <>
                    <MobileMenu options={options} initialValue={initialValue} />
                    <DesktopMenu options={options} initialValue={initialValue} />
                </>
            ) : (
                <>
                    <MobileMenuSkeleton />
                    <DesktopMenuSkeleton />
                </>
            )}
        </>
    )
}

export default MainMenu
