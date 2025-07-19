import { FC, ReactElement } from 'react'

// interfaces
import { Projects } from '@infrastructure/ui/modules/HomeModule/interfaces'

// styles
import { StyledProjectsView } from '@infrastructure/ui/modules/HomeModule/views/ProjectsView/projectsView-style'

export interface ProjectsViewProps {
    projects?: Projects
}

const ProjectsView: FC<ProjectsViewProps> = (): ReactElement => {
    return <StyledProjectsView>ProjectsView</StyledProjectsView>
}

export default ProjectsView
