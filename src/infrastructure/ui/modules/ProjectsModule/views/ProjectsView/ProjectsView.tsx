import { FC, ReactElement } from 'react'

// interfaces
import { ConfigModuleModel } from '@/infrastructure/ui/interfaces'

// styles
import { StyledProjectsView } from '@infrastructure/ui/modules/ProjectsModule/views/ProjectsView/projectsView-style'

export interface ProjectsViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

const ProjectsView: FC<ProjectsViewProps> = ({ status }): ReactElement => {
    return (
        <StyledProjectsView>
            {status === 'SUCCESS' ? <p>ProjectsView</p> : <p>no hay nada</p>}
        </StyledProjectsView>
    )
}

export default ProjectsView
