import tw, { styled } from 'twin.macro'
import { CardActions, CardActionsProps } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IStyledCardActions = CardActionsProps & any

export const StyledCardAction = styled<IStyledCardActions>(CardActions)`
    ${tw``}
`
