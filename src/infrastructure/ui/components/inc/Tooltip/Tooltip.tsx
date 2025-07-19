import { FC, ReactElement } from 'react'
import { TooltipProps as TooltipPropsMUI } from '@mui/material'

// styles
import { StyledTooltip } from '@/infrastructure/ui/components/inc/Tooltip/tooltip-styles'

export type TooltipProps = TooltipPropsMUI

const Tooltip: FC<TooltipProps> = ({ children, ...rest }): ReactElement => {
    return <StyledTooltip {...rest}>{children}</StyledTooltip>
}

export default Tooltip
