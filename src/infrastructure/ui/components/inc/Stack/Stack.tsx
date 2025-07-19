import { FC, ReactElement } from 'react'
import { StackProps as StackPropsMUI } from '@mui/material'

// styles
import { StyledStack } from '@/infrastructure/ui/components/inc/Stack/stack-styles'

export type StackProps = StackPropsMUI

const Stack: FC<StackProps> = ({ children, ...rest }): ReactElement => {
    return <StyledStack {...rest}>{children}</StyledStack>
}

export default Stack
