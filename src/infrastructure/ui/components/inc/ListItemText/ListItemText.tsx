import { FC, ReactElement } from 'react'
import { ListItemTextProps as ListItemTextPropsMUI } from '@mui/material'

// styles
import { StyledListItemText } from '@/infrastructure/ui/components/inc/ListItemText/listItemText-styles'

export type ListItemTextProps = ListItemTextPropsMUI

const ListItemText: FC<ListItemTextProps> = ({ children, ...rest }): ReactElement => {
    return <StyledListItemText {...rest}>{children}</StyledListItemText>
}

export default ListItemText
