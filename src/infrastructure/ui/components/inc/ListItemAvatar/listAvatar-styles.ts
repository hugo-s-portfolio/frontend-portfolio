import tw, { styled } from 'twin.macro'
import { ListItemAvatar, ListItemAvatarProps } from '@mui/material'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IStyledListItemAvatar = ListItemAvatarProps & any

export const StyledListItemAvatar = styled<IStyledListItemAvatar>(ListItemAvatar)`
    ${tw``}
`
