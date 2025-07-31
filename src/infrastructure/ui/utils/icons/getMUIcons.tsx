import { JSXElementConstructor, ReactElement } from 'react'

import { IIcons, Props } from '.'
import { iconsPartI, getIconsPartI } from './iconsPartI'
import { getIconsPartII, iconsPartII } from './iconsPartII'
import { getIconsPartIII, iconsPartIII } from './iconsPartIII'
import { getIconsPartIV, iconsPartIV } from './iconsPartIV'
import { getIconsPartV, iconsPartV } from './iconsPartV'
import { getIconsPartVI, iconsPartVI } from './iconsPartVI'
import { getIconsPartVII, iconsPartVII } from './iconsPartVII'
import { getIconsPartVIII, iconsPartVIII } from './iconsPartVIII'
import { getIconsPartIX, iconsPartIX } from './iconsPartIX'
import { getIconsPartX, iconsPartX } from './iconsPartX'

export const getIcon = (
    key: string,
    props: Props,
): string | ReactElement<unknown, string | JSXElementConstructor<unknown>> => {
    const icons = {
        ...getIconsPartI(props),
        ...getIconsPartII(props),
        ...getIconsPartIII(props),
        ...getIconsPartIV(props),
        ...getIconsPartV(props),
        ...getIconsPartVI(props),
        ...getIconsPartVII(props),
        ...getIconsPartVIII(props),
        ...getIconsPartIX(props),
        ...getIconsPartX(props),
    }

    return icons[key]
}

export const muiIcons: IIcons = {
    ...iconsPartI,
    ...iconsPartII,
    ...iconsPartIII,
    ...iconsPartIV,
    ...iconsPartV,
    ...iconsPartVI,
    ...iconsPartVII,
    ...iconsPartVIII,
    ...iconsPartIX,
    ...iconsPartX,
}
