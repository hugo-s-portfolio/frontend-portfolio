import React, { FC, ReactElement } from 'react'

// models
import { FormObject } from '@/domain/models'

// component
import { Box, Typography } from '@/infrastructure/ui/components'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface CardSpecialtiesProps {
    aboutMeTitle?: FormObject
}

const CardSpecialties: FC<CardSpecialtiesProps> = (): ReactElement => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                my: '16px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                {getIcon('HotelClass', { color: 'primary' })}
                <Typography variant="h2" sx={{ ml: '5px', fontWeight: '500' }}>
                    Especialidades
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: '15px' }}>
                En el mundo del desarrollo web hay muchas especialidades como Front, Back, Cloud y
                UI Designer. Soy un desarrollador FullStack enfocado en el Frontend con Reaccionar,
                pero también tengo conocimientos de diseño de interfaz de usuario y espalda.
            </Typography>
        </Box>
    )
}

export default CardSpecialties
