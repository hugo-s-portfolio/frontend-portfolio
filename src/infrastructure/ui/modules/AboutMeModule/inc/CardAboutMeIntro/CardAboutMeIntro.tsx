/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

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
import { CardAboutMeIntroSkeleton, ErrorCard } from '..'

// utils
import {
    calculateAge,
    findCharacteristic,
    findParameter,
    replaceTextByEntryText,
} from '@/infrastructure/ui/utils/finders'
import { getIcon } from '@/infrastructure/ui/utils/icons'

// store
import {
    homeProfileIntroSelector,
    onHideToastErrorProfileIntro,
    ProfileIntroConfigState,
} from '@/domain/store/homeUseCase'
import { onLoadProfileIntroConfig } from '@/domain/store/homeUseCase/homeProfileIntro/thunk'
import { AppDispatch } from '@/domain/store/store'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'

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

    const { config, loading, error, errorShow } = useGetModuleConfig<ProfileIntroConfigState>({
        selector: homeProfileIntroSelector,
        thunkAction: onLoadProfileIntroConfig({
            country: Countries.CO,
            moduleName: AboutMeModules.ModuleAboutMeIntro,
        }),
    })

    const profileItemList =
        findCharacteristic<ProfileItemList[]>(
            config?.forms?.about_me_profile_item_list,
            'profile_item_list',
        ) || []

    return (
        <>
            {error !== null && (
                <>
                    <ErrorCard
                        error={error}
                        showError={errorShow}
                        componentName="CardAboutMeIntro"
                        onClose={() => {
                            dispatch(onHideToastErrorProfileIntro())
                        }}
                    />
                    <CardAboutMeIntroSkeleton />
                </>
            )}
            {!loading ? (
                <>
                    {config?.forms?.about_me_title?.show && (
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            {config?.forms?.about_me_title?.icon?.show &&
                                config?.forms?.about_me_title?.icon?.url && (
                                    <>
                                        {getIcon(config?.forms?.about_me_title?.icon?.url, {
                                            color: 'primary',
                                        })}
                                    </>
                                )}
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
                <CardAboutMeIntroSkeleton />
            )}
        </>
    )
}

export default CardAboutMeIntro
