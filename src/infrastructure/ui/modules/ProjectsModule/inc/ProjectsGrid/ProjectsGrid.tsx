import { FC, ReactElement } from 'react'

// components
import { Grid } from '@/infrastructure/ui/components'
import ProjectCard from '../ProjectCard'

// interfaces
import { ProjectItem } from '@/infrastructure/ui/modules/ProjectsModule/interfaces'

export interface ProjectsGridProps {
    projects: ProjectItem[]
}

const ProjectsGrid: FC<ProjectsGridProps> = ({ projects }): ReactElement => {
    const visibleProjects = projects
        .filter((project) => project.show)
        .sort((a, b) => a.order - b.order)

    return (
        <Grid container spacing={3}>
            {visibleProjects.map((project) => (
                <Grid item key={project.id} xs={12} sm={6} md={4}>
                    <ProjectCard project={project} />
                </Grid>
            ))}
        </Grid>
    )
}

export default ProjectsGrid
