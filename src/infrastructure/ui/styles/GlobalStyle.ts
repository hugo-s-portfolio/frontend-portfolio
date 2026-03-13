import { createGlobalStyle, DefaultTheme } from 'styled-components/macro'
import tw from 'twin.macro'

import resetStyles from '@infrastructure/ui/styles/ResetStyles'
import { getMontserratFont, getHelveticaFont } from '@infrastructure/ui/styles/webfonts'
import { PaletteColors, PaletteName, getActivePalette } from './palettes'

// type definitions
export type GlobalStyleProps = {
    reset?: boolean
    $paletteName?: PaletteName
    $palettesList?: Record<PaletteName, PaletteColors>
}

export type CustomStylesProps<T = DefaultTheme> = GlobalStyleProps & {
    theme?: T
}

export const GlobalStyle = createGlobalStyle<CustomStylesProps>`
    :root {
        ${(props) => {
            let p: PaletteColors

            if (props.$palettesList) {
                p = getActivePalette(props.$paletteName, props.$palettesList)

                return `
                --color-primary: ${p.primary.DEFAULT};
                --color-primary-light: ${p.primary.light};
                --color-primary-dark: ${p.primary.dark};
                --color-secondary: ${p.secondary.DEFAULT};
                --color-secondary-light: ${p.secondary.light};
                --color-secondary-dark: ${p.secondary.dark};
            `
            }

            p = getActivePalette(props.$paletteName)
            return `
                --color-primary: ${p.primary.DEFAULT};
                --color-primary-light: ${p.primary.light};
                --color-primary-dark: ${p.primary.dark};
                --color-secondary: ${p.secondary.DEFAULT};
                --color-secondary-light: ${p.secondary.light};
                --color-secondary-dark: ${p.secondary.dark};
            `
        }}
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
