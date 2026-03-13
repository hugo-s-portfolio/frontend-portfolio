import { createGlobalStyle, DefaultTheme } from 'styled-components/macro'
import tw from 'twin.macro'

import resetStyles from '@infrastructure/ui/styles/ResetStyles'
import { getMontserratFont, getHelveticaFont } from '@infrastructure/ui/styles/webfonts'
import { getActivePalette } from './palettes'

// type definitions
export type GlobalStyleProps = {
    reset?: boolean
}

export type CustomStylesProps<T = DefaultTheme> = GlobalStyleProps & {
    theme?: T
}

const palette = getActivePalette()

export const GlobalStyle = createGlobalStyle<CustomStylesProps>`
    :root {
        --color-primary: ${palette.primary.DEFAULT};
        --color-primary-light: ${palette.primary.light};
        --color-primary-dark: ${palette.primary.dark};
        --color-secondary: ${palette.secondary.DEFAULT};
        --color-secondary-light: ${palette.secondary.light};
        --color-secondary-dark: ${palette.secondary.dark};
    }

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
