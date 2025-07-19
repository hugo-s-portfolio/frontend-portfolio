import { FC, ReactElement } from 'react'
import { ButtonProps } from '@mui/material'

// styles
import { StyledButton } from '@/infrastructure/ui/components/inc/Buttons/DefaultButton/defaultButton-styles'

export interface DefaultButtonProps extends ButtonProps {
    other?: string
}

const DefaultButton: FC<DefaultButtonProps> = ({ children, ...rest }): ReactElement => {
    return <StyledButton {...rest}>{children}</StyledButton>
}

export default DefaultButton
