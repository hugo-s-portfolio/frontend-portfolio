import { createGlobalStyle, DefaultTheme } from 'styled-components/macro'
import tw from 'twin.macro'

import resetStyles from '@infrastructure/ui/styles/ResetStyles'
import { getMontserratFont, getHelveticaFont } from '@infrastructure/ui/styles/webfonts'

// type definitions
export type GlobalStyleProps = {
    reset?: boolean
}

export type CustomStylesProps<T = DefaultTheme> = GlobalStyleProps & {
    theme?: T
}

export const GlobalStyle = createGlobalStyle<CustomStylesProps>`
    body {
        background-color: ${({ theme }) => theme.colors.light.dark};
    }

    * {
      ${tw`font-montserrat`}
    }

    /* load fonts */
    ${getMontserratFont()}
    ${getHelveticaFont()}

    ${(props) => (props.reset ? resetStyles() : '')}
`
