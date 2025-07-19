import { FC, ReactElement } from 'react'

// interfaces
import { Tutorial } from '@infrastructure/ui/modules/HomeModule/interfaces'

// styles
import { StyledTutorialView } from '@infrastructure/ui/modules/HomeModule/views/TutorialView/tutorialView-styles'

export interface TutorialViewProps {
    tutorial?: Tutorial
}

const TutorialView: FC<TutorialViewProps> = (): ReactElement => {
    return <StyledTutorialView>TutorialView</StyledTutorialView>
}

export default TutorialView
