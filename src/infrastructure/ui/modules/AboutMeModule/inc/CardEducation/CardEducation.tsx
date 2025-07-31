import React, { FC, ReactElement } from 'react'

// models
import { FormObject } from '@/domain/models'

// component
import { Box, Typography } from '@/infrastructure/ui/components'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface CardEducationProps {
    aboutMeTitle: FormObject
}

const CardEducation: FC<CardEducationProps> = ({ aboutMeTitle }): ReactElement => {
    return (
        <Box
            sx={{
                boxSizing: 'border-box',
                my: '16px',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row', my: '15px' }}>
                {getIcon('School', { color: 'primary' })}
                <Typography variant="h2" sx={{ ml: '5px', fontWeight: '500' }}>
                    Educación
                </Typography>
            </Box>

            <Typography variant="body2" sx={{ mb: '15px' }}>
                Soy Ingeniero Mecánico de profesión, pero Software Desarrollador por vocación,
                también soy una persona que cree en cualquier forma de educación, especialmente
                educación autónoma. Me considero una persona muy curiosa abierta para aprender cosas
                nuevas, también me gusta afrontar retos y sobre todo conocerlos.
            </Typography>
        </Box>
    )
}

export default CardEducation
