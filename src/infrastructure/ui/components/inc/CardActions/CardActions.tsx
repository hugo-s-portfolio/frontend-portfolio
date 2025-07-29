import React, { FC } from 'react'
import { CardActionsProps as CardActionsPropsMUI } from '@mui/material'

// styles
import { StyledCardAction } from '@/infrastructure/ui/components/inc/CardActions/carActions-styles'

export type CardActionsProps = CardActionsPropsMUI

const CardActions: FC<CardActionsProps> = ({ children, ...rest }) => {
    return <StyledCardAction {...rest}>{children}</StyledCardAction>
}

export default CardActions
