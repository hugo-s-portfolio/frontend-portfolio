import React, { FC, ReactElement, useState } from 'react'
import { useRouter } from 'next/navigation'

// styles
import { StyledDesktopMenu } from '@/infrastructure/ui/components/ui/DesktopMenu/desktopMenu-styles'

// components
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@/infrastructure/ui/components//inc'

// icons
import { muiIcons } from '@/infrastructure/ui/utils/icons'

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
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon icon={muiIcons['Menu']} />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {orderedOptions.map(({ menuId, icon, label, route }) => (
                    <SpeedDialAction
                        key={menuId}
                        icon={muiIcons[icon]}
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
