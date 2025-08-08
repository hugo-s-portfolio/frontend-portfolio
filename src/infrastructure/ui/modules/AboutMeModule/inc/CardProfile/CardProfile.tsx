/* eslint-disable react-hooks/exhaustive-deps */
import { FC, ReactElement } from 'react'

// base components
import { Box, Divider, IconButton, Typography } from '@/infrastructure/ui/components'
import { CardProfileSkeleton } from '@/infrastructure/ui/modules/AboutMeModule/inc'

import { StyledHomeImage } from '@/infrastructure/ui/modules/AboutMeModule/inc/CardProfile/cardProfile-styles'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

// utils
import { findCharacteristic, findParameter } from '@/infrastructure/ui/utils/finders'

// selector
import { homeProfileSelector, ProfileConfigState } from '@/domain/store/homeUseCase'

// actions
import { onLoadProfileConfig } from '@/domain/store/homeUseCase/homeProfile/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'

// models
import { Countries } from '@/domain/models'

// enums
import { AboutMeModules } from '@/infrastructure/ui/modules/AboutMeModule/enums'

export interface CardProfileProps {
    test?: string
}

const CardProfile: FC<CardProfileProps> = (): ReactElement => {
    const { config, loading, error } = useGetModuleConfig<ProfileConfigState>({
        selector: homeProfileSelector,
        thunkAction: onLoadProfileConfig({
            country: Countries.CO,
            moduleName: AboutMeModules.ModuleAboutMeProfile,
        }),
    })

    const social =
        findCharacteristic<{ link: string; name: string; order: number; show: true }[]>(
            config?.actions?.about_me_social_media,
            'social_media_list',
        ) || []

    const socialMedia = social?.filter((item) => item.show)?.sort((a, b) => a.order - b.order)

    const onNavigate = (link: string): void => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <>
            {error !== null && <p>Hay un error!</p>}
            {!loading ? (
                <>
                    {config?.forms?.about_me_card?.show && (
                        <Box
                            sx={(theme) => ({
                                height: { xs: '77vh', md: '88vh' },
                                width: { xs: '100%', md: '700px' },
                                maxWidth: '768px',
                                margin: { md: '0 20px 0 0' },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                borderRadius: '4px',
                                overflow: 'hidden',
                                boxShadow: `0px 0px 5px 0px ${theme.palette.primary.main}`,
                                backgroundColor: '#FFFFFF',
                            })}
                        >
                            <Box
                                sx={{
                                    height: '50%',
                                    width: '100%',
                                    backgroundImage: `url(${findParameter<string>(
                                        config?.forms?.about_me_card,
                                        'image_bg_head',
                                    )})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    position: 'relative',
                                }}
                            >
                                {config?.forms?.about_me_card?.icon?.show &&
                                    config?.forms?.about_me_card?.icon?.url && (
                                        <StyledHomeImage
                                            src={config?.forms?.about_me_card?.icon?.url}
                                            alt="profile photo"
                                            width={208}
                                            height={208}
                                        />
                                    )}
                            </Box>
                            <Box
                                sx={{
                                    height: '320px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            >
                                {config?.forms?.about_me_name?.show && (
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '20px',
                                            mb: '10px',
                                            fontFamily: 'Helvetica',
                                        }}
                                    >
                                        {config?.forms?.about_me_name?.label}
                                    </Typography>
                                )}

                                {config?.forms?.about_me_job?.show && (
                                    <Typography
                                        variant="h2"
                                        color="primary"
                                        sx={{ mb: '5px', fontStyle: 'italic', fontWeight: 600 }}
                                    >
                                        {config?.forms?.about_me_job?.label}
                                    </Typography>
                                )}

                                {config?.forms?.about_me_description?.show && (
                                    <Typography variant="h3" sx={{ mb: '5px' }}>
                                        {config?.forms?.about_me_description?.label}
                                    </Typography>
                                )}

                                {config?.forms?.about_me_location?.show && (
                                    <Typography variant="h4" sx={{ mb: '5px' }}>
                                        {config?.forms?.about_me_location?.label}
                                    </Typography>
                                )}

                                <Divider sx={{ height: '5px' }} />

                                {config?.actions?.about_me_social_media?.show && (
                                    <Box
                                        sx={{
                                            margin: '10px',
                                        }}
                                    >
                                        {socialMedia?.map((social) => (
                                            <IconButton
                                                onClick={() => onNavigate(social?.link)}
                                                key={social?.name}
                                                color="primary"
                                            >
                                                {getIcon(social?.name, {})}
                                            </IconButton>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </>
            ) : (
                <CardProfileSkeleton />
            )}
        </>
    )
}

export default CardProfile
