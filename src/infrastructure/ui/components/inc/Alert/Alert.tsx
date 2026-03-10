import { forwardRef, ReactElement } from 'react'
import { AlertProps as AlertPropsMUI } from '@mui/material'

// styles
import { StyledAlert } from '@/infrastructure/ui/components/inc/Alert/alert-styles'

export type AlertProps = AlertPropsMUI

const Alert = forwardRef<HTMLDivElement, AlertProps>(
    ({ children, ...rest }, ref): ReactElement => {
        return (
            <StyledAlert ref={ref} {...rest}>
                {children}
            </StyledAlert>
        )
    }
)

Alert.displayName = 'Alert'

export default Alert
