export type PaletteColors = {
    primary: { DEFAULT: string; light: string; dark: string }
    secondary: { DEFAULT: string; light: string; dark: string }
}

export type PaletteName = 'purple' | 'blue' | 'green' | 'red'

export const palettes: Record<PaletteName, PaletteColors> = {
    purple: {
        primary: { DEFAULT: '#5B4B8A', light: '#7858A6', dark: '#371B58' },
        secondary: { DEFAULT: '#FDA65D', light: '#FFD07F', dark: '#E26A2C' },
    },
    blue: {
        primary: { DEFAULT: '#1565C0', light: '#42A5F5', dark: '#0D47A1' },
        secondary: { DEFAULT: '#FF7043', light: '#FF8A65', dark: '#E64A19' },
    },
    green: {
        primary: { DEFAULT: '#2E7D32', light: '#66BB6A', dark: '#1B5E20' },
        secondary: { DEFAULT: '#FFA726', light: '#FFB74D', dark: '#F57C00' },
    },
    red: {
        primary: { DEFAULT: '#C62828', light: '#EF5350', dark: '#B71C1C' },
        secondary: { DEFAULT: '#42A5F5', light: '#64B5F6', dark: '#1565C0' },
    },
}

export const DEFAULT_PALETTE: PaletteName = 'purple'

export function getActivePalette(name?: PaletteName): PaletteColors {
    const paletteName = name || (process.env.NEXT_PUBLIC_PALETTE as PaletteName) || DEFAULT_PALETTE
    return palettes[paletteName] || palettes[DEFAULT_PALETTE]
}
