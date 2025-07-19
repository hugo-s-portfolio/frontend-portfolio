import { FC, ReactElement } from 'react'

// base components
import { CardProfile } from '@infrastructure/ui/modules/HomeModule/inc'

// styles
import { StyleAboutMeView } from '@infrastructure/ui/modules/HomeModule/views/AboutMeView/aboutMeView-style'

// interfaces
import { AboutMe } from '@infrastructure/ui/modules/HomeModule/interfaces'

export interface AboutMeViewProps {
    aboutMe: AboutMe
}

const AboutMeView: FC<AboutMeViewProps> = ({ aboutMe }): ReactElement => {
    return (
        <StyleAboutMeView>
            <CardProfile
                images={aboutMe.images}
                profile={aboutMe.profile}
                socialMedia={aboutMe.socialMedia}
            />
        </StyleAboutMeView>
    )
}

export default AboutMeView
