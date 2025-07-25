import { FC, ReactElement, SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

// styles
import { StyledMenuMobile } from '@/infrastructure/ui/components/ui/MobileMenu/menuMobile-styles'

// base component
import { Tab, Tabs } from '@/infrastructure/ui/components'

// icons
import { muiIcons } from '@/infrastructure/ui/utils/icons'

export interface MobileMenuProps {
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
                    ?.sort((a, b) => a.menuId - b.menuId)
                    ?.map(({ label, icon, fontSize, menuId, route }) => (
                        <Tab
                            key={menuId}
                            onClick={() => handleNavigation(route)}
                            icon={muiIcons[icon]}
                            sx={{ fontSize }}
                            label={label}
                        />
                    ))}
            </Tabs>
        </StyledMenuMobile>
    )
}

export default MobileMenu
