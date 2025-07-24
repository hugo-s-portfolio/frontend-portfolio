import { FC, ReactElement } from 'react'

// base components
import { CardProfile } from '@infrastructure/ui/modules/HomeModule/inc'

// styles
import { StyleAboutMeView } from '@infrastructure/ui/modules/HomeModule/views/AboutMeView/aboutMeView-style'

// interfaces
import { FormObject, Action } from '@/infrastructure/ui/interfaces'

export interface AboutMeViewProps {
    aboutMeCard: FormObject
    aboutMeName: FormObject
    aboutMeJob: FormObject
    aboutMeDescription: FormObject
    aboutMeLocation: FormObject
    aboutMeSocialMedia: Action
}

const AboutMeView: FC<AboutMeViewProps> = ({
    aboutMeCard,
    aboutMeName,
    aboutMeJob,
    aboutMeDescription,
    aboutMeLocation,
    aboutMeSocialMedia,
}): ReactElement => {
    return (
        <StyleAboutMeView>
            <CardProfile
                aboutMeCard={aboutMeCard}
                aboutMeName={aboutMeName}
                aboutMeJob={aboutMeJob}
                aboutMeDescription={aboutMeDescription}
                aboutMeLocation={aboutMeLocation}
                aboutMeSocialMedia={aboutMeSocialMedia}
            />
        </StyleAboutMeView>
    )
}

export default AboutMeView
