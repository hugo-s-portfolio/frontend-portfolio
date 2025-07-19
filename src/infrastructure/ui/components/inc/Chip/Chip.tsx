import { FC, ReactElement } from 'react'
import { ChipProps as ChipPropsMUI } from '@mui/material'

// styles
import { StyledChip } from '@/infrastructure/ui/components/inc/Chip/chip-styles'

export type ChipProps = ChipPropsMUI

const Chip: FC<ChipProps> = ({ ...rest }): ReactElement => {
    return <StyledChip {...rest} />
}

export default Chip
