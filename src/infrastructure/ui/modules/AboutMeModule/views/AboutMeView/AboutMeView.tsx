import { FC, ReactElement } from 'react'

// base components
import { CardInformation, CardProfile } from '@/infrastructure/ui/modules/AboutMeModule/inc'

// styles
import {
    StyleAboutMeView,
    StyledCardProfile,
} from '@/infrastructure/ui/modules/AboutMeModule/views/AboutMeView/aboutMeView-style'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

export interface AboutMeViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

const AboutMeView: FC<AboutMeViewProps> = ({ config, status }): ReactElement => {
    return (
        <StyleAboutMeView>
            {status === 'SUCCESS' ? (
                <StyledCardProfile>
                    <CardProfile
                        aboutMeCard={config?.forms?.about_me_card}
                        aboutMeName={config?.forms?.about_me_name}
                        aboutMeJob={config?.forms?.about_me_job}
                        aboutMeDescription={config?.forms?.about_me_description}
                        aboutMeLocation={config?.forms?.about_me_location}
                        aboutMeSocialMedia={config?.actions?.about_me_social_media}
                    />
                    <CardInformation
                        aboutMeTitle={config?.forms?.about_me_title}
                        aboutMeResume={config?.forms?.about_me_resume}
                        aboutMeProfileItemList={config?.forms?.about_me_profile_item_list}
                        aboutMeServices={config?.forms?.about_me_services}
                    />
                </StyledCardProfile>
            ) : (
                <p>no hay nada</p>
            )}
        </StyleAboutMeView>
    )
}

export default AboutMeView
