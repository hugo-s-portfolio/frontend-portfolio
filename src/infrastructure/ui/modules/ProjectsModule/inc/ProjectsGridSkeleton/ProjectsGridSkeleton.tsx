import { ReactElement } from 'react'

// components
import { Grid } from '@/infrastructure/ui/components'
import ProjectCardSkeleton from '../ProjectCardSkeleton'

const ProjectsGridSkeleton = (): ReactElement => (
    <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
                <ProjectCardSkeleton />
            </Grid>
        ))}
    </Grid>
)

export default ProjectsGridSkeleton
