import { FC, ReactElement, SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// styles
import { StyledMenuMobile } from '@/infrastructure/ui/components/ui/MobileMenu/menuMobile-styles'

// base component
import { Tab, Tabs } from '@/infrastructure/ui/components'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// models
import { TabsMenuConfig } from '@/domain/models'

export interface MobileMenuProps {
    options: TabsMenuConfig[]
    initialValue: number
}

const MobileMenu: FC<MobileMenuProps> = ({ options, initialValue }): ReactElement => {
    const [value, setValue] = useState(initialValue)
    const router = useRouter()

    const handleChangeOption = (_e: SyntheticEvent<Element, Event>, newValue: number): void => {
        setValue(newValue)
    }

    const handleNavigation = (link: string): void => {
        router.push(link)
    }

    return (
        <StyledMenuMobile>
            <Tabs value={value} onChange={handleChangeOption} centered $indicatorPosition="top">
                {options
                    ?.slice()
                    ?.sort((a, b) => (a?.menuId ?? 1) - (b?.menuId ?? 1))
                    ?.map(({ label, icon, fontSize, menuId, route }) => {
                        if (!icon || !route) return

                        return (
                            <Tab
                                key={menuId}
                                onClick={() => handleNavigation(route)}
                                icon={getIcon(icon, {})}
                                sx={{ fontSize }}
                                label={label}
                            />
                        )
                    })}
            </Tabs>
        </StyledMenuMobile>
    )
}

export default MobileMenu
