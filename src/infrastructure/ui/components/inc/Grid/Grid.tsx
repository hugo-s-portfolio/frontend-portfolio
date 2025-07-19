import { FC, ReactElement } from 'react'
import { GridProps as GridPropsMUI } from '@mui/material'

// styles
import { StyledGrid } from '@/infrastructure/ui/components/inc/Grid/grid-styles'

export type GridProps = GridPropsMUI

const Grid: FC<GridProps> = ({ children, ...rest }): ReactElement => {
    return <StyledGrid {...rest}>{children}</StyledGrid>
}

export default Grid
