import { FC, ReactElement } from 'react'

import { Box, Divider, IconButton, Typography } from '@/infrastructure/ui/components'

import { StyledHomeImage } from '@/infrastructure/ui/modules/AboutMeModule/inc/CardProfile/cardProfile-styles'

import { getIcon } from '@/infrastructure/ui/utils/icons'

// interfaces
import { FormObject, Action } from '@/infrastructure/ui/interfaces'

// utils
import { findCharacteristic, findParameter } from '@/infrastructure/ui/utils/finders'

export interface CardProfileProps {
    aboutMeCard: FormObject
    aboutMeName: FormObject
    aboutMeJob: FormObject
    aboutMeDescription: FormObject
    aboutMeLocation: FormObject
    aboutMeSocialMedia: Action
}

const CardProfile: FC<CardProfileProps> = ({
    aboutMeCard,
    aboutMeName,
    aboutMeJob,
    aboutMeDescription,
    aboutMeLocation,
    aboutMeSocialMedia,
}): ReactElement => {
    const social =
        findCharacteristic<{ link: string; name: string; order: number; show: true }[]>(
            aboutMeSocialMedia,
            'social_media_list',
        ) || []

    const socialMedia = social?.filter((item) => item.show).sort((a, b) => a.order - b.order)

    const onNavigate = (link: string): void => {
        if (link) {
            window.open(link, '_blank', 'noopener,noreferrer')
        }
    }

    return (
        <>
            {aboutMeCard?.show && (
                <Box
                    sx={(theme) => ({
                        height: { xs: '77vh', md: '88vh' },
                        width: { xs: '100%', md: '28rem' },
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
                                aboutMeCard,
                                'image_bg_head',
                            )})`,
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            position: 'relative',
                        }}
                    >
                        {aboutMeCard?.icon?.show && aboutMeCard?.icon?.url && (
                            <StyledHomeImage
                                src={aboutMeCard?.icon?.url}
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
                        {aboutMeName?.show && (
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '20px',
                                    mb: '10px',
                                    fontFamily: 'Helvetica',
                                }}
                            >
                                {aboutMeName?.label}
                            </Typography>
                        )}

                        {aboutMeJob?.show && (
                            <Typography
                                variant="h2"
                                color="primary"
                                sx={{ mb: '5px', fontStyle: 'italic', fontWeight: 600 }}
                            >
                                {aboutMeJob?.label}
                            </Typography>
                        )}

                        {aboutMeDescription?.show && (
                            <Typography variant="h3" sx={{ mb: '5px' }}>
                                {aboutMeDescription?.label}
                            </Typography>
                        )}

                        {aboutMeLocation?.show && (
                            <Typography variant="h4" sx={{ mb: '5px' }}>
                                {aboutMeLocation?.label}
                            </Typography>
                        )}

                        <Divider sx={{ height: '5px' }} />

                        {aboutMeSocialMedia?.show && (
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
    )
}

export default CardProfile
