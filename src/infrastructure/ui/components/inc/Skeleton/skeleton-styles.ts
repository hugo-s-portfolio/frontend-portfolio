import tw, { styled } from 'twin.macro'
import MuiSkeleton, { SkeletonProps as SkeletonPropsMUI } from '@mui/material/Skeleton'

export type StyledSkeletonProps = SkeletonPropsMUI

export const StyledSkeleton = styled(MuiSkeleton)<StyledSkeletonProps>`
    ${tw``}
`
