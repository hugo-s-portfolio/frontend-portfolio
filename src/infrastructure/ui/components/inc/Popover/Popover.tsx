import { FC, ReactElement } from 'react'
import { PopoverProps as PopoverPropsMUI } from '@mui/material'

// styles
import { StyledPopover } from '@/infrastructure/ui/components/inc/Popover/popover-styles'

export type PopoverProps = PopoverPropsMUI

const Popover: FC<PopoverProps> = ({ children, ...rest }): ReactElement => {
    return <StyledPopover {...rest}>{children}</StyledPopover>
}

export default Popover
