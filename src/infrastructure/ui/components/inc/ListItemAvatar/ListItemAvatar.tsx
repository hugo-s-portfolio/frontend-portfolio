import React, { FC, ReactElement } from 'react'
import { ListItemAvatarProps as ListItemAvatarPropsMUI } from '@mui/material'

// styles
import { StyledListItemAvatar } from '@/infrastructure/ui/components/inc/ListItemAvatar/listAvatar-styles'

export type ListItemAvatarProps = ListItemAvatarPropsMUI

const ListItemAvatar: FC<ListItemAvatarProps> = ({ children, ...rest }): ReactElement => {
    return <StyledListItemAvatar {...rest}>{children}</StyledListItemAvatar>
}

export default ListItemAvatar
