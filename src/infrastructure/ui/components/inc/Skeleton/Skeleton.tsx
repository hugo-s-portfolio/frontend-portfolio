import React, { FC, ReactElement } from 'react'

import { SkeletonProps as SkeletonPropsMUI } from '@mui/material/Skeleton'

// styles
import { StyledSkeleton } from './skeleton-styles'

export type SkeletonProps = SkeletonPropsMUI

const Skeleton: FC<SkeletonProps> = ({ children, ...rest }): ReactElement => {
    return <StyledSkeleton {...rest}>{children}</StyledSkeleton>
}

export default Skeleton
