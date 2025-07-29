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
import { CardService } from '@/infrastructure/ui/modules/AboutMeModule/inc'

// utils
import {
    calculateAge,
    findCharacteristic,
    findParameter,
    replaceTextByEntryText,
} from '@/infrastructure/ui/utils/finders'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface CardInformationProps {
    aboutMeTitle: FormObject
    aboutMeResume: FormObject
    aboutMeProfileItemList: FormObject
    aboutMeServices: FormObject
}

const CardInformation: FC<CardInformationProps> = ({
    aboutMeTitle,
    aboutMeResume,
    aboutMeProfileItemList,
    aboutMeServices,
}): ReactElement => {
    const profileItemList =
        findCharacteristic<
            { subtitle: string; title: string; order: number; enable: true; icon: string }[]
        >(aboutMeProfileItemList, 'profile_item_list') || []

    return (
        <>
            {aboutMeTitle?.show && (
                <Box
                    sx={(theme) => ({
                        height: { md: '88vh' },
                        width: { xs: '100%', md: 'calc(100% - 28rem)' },
                        margin: { xs: '16px 0 80px', md: '0' },
                        padding: { xs: '16px', lg: '32px' },
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                        boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                        backgroundColor: '#FFFFFF',
                        overflowY: {
                            md: 'scroll',
                        },
                    })}
                >
                    {aboutMeTitle?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {getIcon('AssignmentInd', { color: 'primary' })}
                            <Typography
                                variant="h2"
                                sx={{ mb: '10px', ml: '5px', fontWeight: '500' }}
                            >
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
                                                        findParameter(
                                                            aboutMeProfileItemList,
                                                            'age',
                                                        ),
                                                    )}`,
                                                )}
                                            />
                                        )}
                                    </ListItem>
                                ))}
                        </List>
                    </Box>

                    <CardService aboutMeServices={aboutMeServices} />
                </Box>
            )}
        </>
    )
}

export default CardInformation
