import { FC, ReactElement } from 'react'

// styles
import { StyledTabs, StyledTabsProps } from '@/infrastructure/ui/components/inc/Tabs/tabs-styles'

const Tabs: FC<StyledTabsProps> = ({
    children,
    $indicatorPosition = 'bottom',
    ...rest
}): ReactElement => {
    return (
        <StyledTabs $indicatorPosition={$indicatorPosition} {...rest}>
            {children}
        </StyledTabs>
    )
}

export default Tabs
