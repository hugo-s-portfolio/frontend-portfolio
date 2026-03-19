import { FC, ReactElement } from 'react'

// components
import { Box, Typography } from '@/infrastructure/ui/components'
import { ProjectsGrid } from '@/infrastructure/ui/modules/ProjectsModule/inc'

// data
import { mockProjects } from '@/infrastructure/ui/modules/ProjectsModule/data'

// styles
import { StyledProjectsView } from '@infrastructure/ui/modules/ProjectsModule/views/ProjectsView/projectsView-style'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface ProjectsViewProps {
    test?: string
}

const ProjectsView: FC<ProjectsViewProps> = (): ReactElement => {
    return (
        <StyledProjectsView>
            <Box sx={{ display: 'flex', flexDirection: 'row', mb: '24px' }}>
                {getIcon('Work', { color: 'primary' })}
                <Typography variant="h2" sx={{ ml: '8px', fontWeight: '500' }}>
                    Projects
                </Typography>
            </Box>
            <ProjectsGrid projects={mockProjects} />
        </StyledProjectsView>
    )
}

export default ProjectsView
