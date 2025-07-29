import React, { FC, ReactElement, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// styles
import { StyledDesktopMenu } from '@/infrastructure/ui/components/ui/DesktopMenu/desktopMenu-styles'

// components
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@/infrastructure/ui/components//inc'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

interface DesktopMenuProps {
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

const DesktopMenu: FC<DesktopMenuProps> = ({ options }): ReactElement => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const orderedOptions = options?.sort((a, b) => a.menuId - b.menuId)

    const handleOpen = (): void => setOpen(true)
    const handleClose = (): void => setOpen(false)

    const handleNavigation = (link: string): void => {
        router.push(link)
        setOpen(false)
    }

    return (
        <StyledDesktopMenu>
            <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ position: 'absolute', bottom: 10, right: 16 }}
                icon={<SpeedDialIcon icon={getIcon('Menu', {})} openIcon={getIcon('Add', {})} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {orderedOptions?.map(({ menuId, icon, label, route }) => (
                    <SpeedDialAction
                        key={menuId}
                        icon={getIcon(icon, {
                            color:
                                pathname?.toLowerCase() === route?.toLowerCase()
                                    ? 'primary'
                                    : 'inherit',
                        })}
                        tooltipTitle={label}
                        tooltipOpen
                        onClick={() => handleNavigation(route)}
                    />
                ))}
            </SpeedDial>
        </StyledDesktopMenu>
    )
}

export default DesktopMenu
