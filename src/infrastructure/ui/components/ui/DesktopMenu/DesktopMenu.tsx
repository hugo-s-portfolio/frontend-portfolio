import React, { FC, ReactElement, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// styles
import { StyledDesktopMenu } from '@/infrastructure/ui/components/ui/DesktopMenu/desktopMenu-styles'

// components
import { SpeedDialAction, SpeedDial, SpeedDialIcon } from '@/infrastructure/ui/components'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// models
import { TabsMenuConfig } from '@/domain/models'

interface DesktopMenuProps {
    options: TabsMenuConfig[]
}

const DesktopMenu: FC<DesktopMenuProps> = ({ options }): ReactElement => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()
    const orderedOptions = options?.slice().sort((a, b) => (a?.menuId ?? 1) - (b?.menuId ?? 1))

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
                {orderedOptions?.map(({ menuId, icon, label, route }) => {
                    if (!icon || !route) return
                    return (
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
                    )
                })}
            </SpeedDial>
        </StyledDesktopMenu>
    )
}

export default DesktopMenu
