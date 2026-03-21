import { ReactElement } from 'react'

// components
import { Box, Grid, Skeleton } from '@/infrastructure/ui/components'
import ProjectCardSkeleton from '../ProjectCardSkeleton'

const ProjectsGridSkeleton = (): ReactElement => (
    <>
        <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px 0' }}>
            <Skeleton
                animation="wave"
                variant="circular"
                sx={{
                    width: 30,
                    height: 30,
                    marginRight: 1,
                }}
            />
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ height: 10, width: 150, borderRadius: 4 }}
            />
        </Box>

        <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                    <ProjectCardSkeleton />
                </Grid>
            ))}
        </Grid>
    </>
)

export default ProjectsGridSkeleton
