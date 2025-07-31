import React, { FC, ReactElement } from 'react'

import { FormObject } from '@/domain/models'

// components
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@/infrastructure/ui/components'

// utils
import {
    calculateAge,
    findCharacteristic,
    findParameter,
    replaceTextByEntryText,
} from '@/infrastructure/ui/utils/finders'
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface CardAboutMeIntroProps {
    aboutMeTitle: FormObject
    aboutMeResume: FormObject
    aboutMeProfileItemList: FormObject
}

export interface ProfileItemList {
    subtitle: string
    title: string
    order: number
    enable: true
    icon: string
}

const CardAboutMeIntro: FC<CardAboutMeIntroProps> = ({
    aboutMeTitle,
    aboutMeResume,
    aboutMeProfileItemList,
}): ReactElement => {
    const profileItemList =
        findCharacteristic<ProfileItemList[]>(aboutMeProfileItemList, 'profile_item_list') || []

    return (
        <>
            {aboutMeTitle?.show && (
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {getIcon('AssignmentInd', { color: 'primary' })}
                    <Typography variant="h2" sx={{ mb: '10px', ml: '5px', fontWeight: '500' }}>
                        {aboutMeTitle?.label}
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    boxSizing: 'border-box',
                }}
            >
                {aboutMeResume?.show && (
                    <Typography variant="body2" sx={{ mb: '5px' }}>
                        {aboutMeResume.label}
                    </Typography>
                )}

                <List
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: {
                            xs: 'column',
                            lg: 'row',
                        },
                        justifyContent: {
                            lg: 'flex-start',
                        },
                        alignItems: {
                            lg: 'center',
                        },
                        flexWrap: 'wrap',
                        bgcolor: 'background.paper',
                        gap: { xs: '10px', lg: '0' },
                    }}
                >
                    {profileItemList
                        ?.filter((i) => i.enable)
                        ?.map(({ title, icon, subtitle }) => (
                            <ListItem
                                key={title}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        lg: '50%',
                                    },
                                }}
                            >
                                <ListItemAvatar>
                                    {icon && <Avatar>{getIcon(icon, {})}</Avatar>}
                                </ListItemAvatar>
                                {title && (
                                    <ListItemText
                                        primary={title}
                                        secondary={replaceTextByEntryText(
                                            subtitle,
                                            '{edad}',
                                            `${calculateAge(
                                                findParameter(aboutMeProfileItemList, 'age'),
                                            )}`,
                                        )}
                                    />
                                )}
                            </ListItem>
                        ))}
                </List>
            </Box>
        </>
    )
}

export default CardAboutMeIntro
