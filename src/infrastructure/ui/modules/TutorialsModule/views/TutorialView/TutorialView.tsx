import { FC, ReactElement } from 'react'

// models
import { ConfigModuleModel } from '@/domain/models'

// styles
import { StyledTutorialView } from '@infrastructure/ui/modules/TutorialsModule/views/TutorialView/tutorialView-styles'

export interface TutorialViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

const TutorialView: FC<TutorialViewProps> = ({ status }): ReactElement => {
    return (
        <StyledTutorialView>
            {status === 'SUCCESS' ? <p>TutorialView</p> : <p>no hay nada</p>}
        </StyledTutorialView>
    )
}

export default TutorialView
