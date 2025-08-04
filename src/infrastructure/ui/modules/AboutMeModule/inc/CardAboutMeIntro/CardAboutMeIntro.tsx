/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import {
    Avatar,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from '@/infrastructure/ui/components'

// utils
import {
    calculateAge,
    findCharacteristic,
    findParameter,
    getCookie,
    replaceTextByEntryText,
} from '@/infrastructure/ui/utils/finders'
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import { AppDispatch } from '@/domain/store/store'
import { homeProfileIntroSelector, ProfileConfigState } from '@/domain/store/homeUseCase'
import { onLoadProfileIntroConfig } from '@/domain/store/homeUseCase/homeProfileIntro/thunk'

export interface CardAboutMeIntroProps {
    test?: string
}

export interface ProfileItemList {
    subtitle: string
    title: string
    order: number
    enable: true
    icon: string
}

const CardAboutMeIntro: FC<CardAboutMeIntroProps> = (): ReactElement => {
    const dispatch: AppDispatch = useDispatch()
    const token = getCookie('session')

    const { config, loading, error } = useSelector(homeProfileIntroSelector) as ProfileConfigState

    const profileItemList =
        findCharacteristic<ProfileItemList[]>(
            config?.forms?.about_me_profile_item_list,
            'profile_item_list',
        ) || []

    useEffect(() => {
        if (token) {
            dispatch(
                onLoadProfileIntroConfig({
                    country: 'CO',
                    token,
                    moduleName: 'module_about_me_intro',
                }),
            )
        }
    }, [])

    return (
        <>
            {error !== null && <p>Hay un error!</p>}
            {!loading ? (
                <>
                    {config?.forms?.about_me_title?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {getIcon('AssignmentInd', { color: 'primary' })}
                            <Typography
                                variant="h2"
                                sx={{ mb: '10px', ml: '5px', fontWeight: '500' }}
                            >
                                {config?.forms?.about_me_title?.label}
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            boxSizing: 'border-box',
                        }}
                    >
                        {config?.forms?.about_me_resume?.show && (
                            <Typography variant="body2" sx={{ mb: '5px' }}>
                                {config?.forms?.about_me_resume?.label}
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
                                                            config?.forms
                                                                ?.about_me_profile_item_list,
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
                </>
            ) : (
                <>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        sx={{
                            width: '40%',
                            height: '12px',
                            borderRadius: '8px',
                            marginBottom: '15px',
                        }}
                    />
                    {[1, 2, 3, 4].map((item) => (
                        <Skeleton
                            key={item}
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                width: '100%',
                                height: '10px',
                                borderRadius: '4px',
                                marginBottom: '5px',
                            }}
                        />
                    ))}

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            margin: '20px 0',
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
                        {[1, 2, 3, 4].map((item) => (
                            <Box
                                key={item}
                                sx={{
                                    width: {
                                        xs: '100%',
                                        lg: '48%',
                                    },
                                    margin: '4px 0',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <Skeleton
                                    animation="wave"
                                    variant="circular"
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                    }}
                                />
                                <Box
                                    sx={{
                                        marginLeft: '10px',
                                        width: '70%',
                                        height: '100%',
                                    }}
                                >
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        sx={{
                                            width: '100%',
                                            height: '10px',
                                            borderRadius: '4px',
                                            marginBottom: '5px',
                                        }}
                                    />
                                    <Skeleton
                                        animation="wave"
                                        variant="rectangular"
                                        sx={{
                                            width: '70%',
                                            height: '10px',
                                            borderRadius: '4px',
                                            marginBottom: '5px',
                                        }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </>
            )}
        </>
    )
}

export default CardAboutMeIntro
