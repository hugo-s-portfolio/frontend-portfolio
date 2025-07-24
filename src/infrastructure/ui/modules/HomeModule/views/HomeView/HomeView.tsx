import { FC, ReactElement } from 'react'

// base components
import { AboutMeView } from '@infrastructure/ui/modules/HomeModule'

// styles
import { StyledHomeView } from '@infrastructure/ui/modules/HomeModule/views/HomeView/homeView-styles'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

export interface HomeViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

export interface Option {
    label: string
    fontSize: number
    icon: string
    id: number
}

const HomeView: FC<HomeViewProps> = ({ config, status }): ReactElement => {
    return (
        <StyledHomeView>
            {status === 'SUCCESS' ? (
                <AboutMeView
                    aboutMeCard={config?.forms?.about_me_card}
                    aboutMeName={config?.forms?.about_me_name}
                    aboutMeJob={config?.forms?.about_me_job}
                    aboutMeDescription={config?.forms?.about_me_description}
                    aboutMeLocation={config?.forms?.about_me_location}
                    aboutMeSocialMedia={config?.actions?.about_me_social_media}
                />
            ) : (
                <div>Error loading content</div>
            )}
        </StyledHomeView>
    )
}

export default HomeView
