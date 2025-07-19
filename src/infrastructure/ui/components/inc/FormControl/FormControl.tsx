import { FC, ReactElement } from 'react'
import { FormControlProps as FormControlPropsMUI } from '@mui/material'

// styles
import { StyledFormControl } from '@/infrastructure/ui/components/inc/FormControl/formControl-styles'

export type FormControlProps = FormControlPropsMUI

const FormControl: FC<FormControlProps> = ({ children, ...rest }): ReactElement => {
    return <StyledFormControl {...rest}>{children}</StyledFormControl>
}

export default FormControl
