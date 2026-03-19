import { ReactElement } from 'react'

// components
import { Box, Card, CardContent, Skeleton } from '@/infrastructure/ui/components'

const ProjectCardSkeleton = (): ReactElement => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton animation="wave" variant="rectangular" sx={{ height: 180 }} />
        <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '70%', height: '20px', borderRadius: '4px', mb: '10px' }}
            />
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '100%', height: '14px', borderRadius: '4px', mb: '6px' }}
            />
            <Skeleton
                animation="wave"
                variant="rectangular"
                sx={{ width: '90%', height: '14px', borderRadius: '4px', mb: '14px' }}
            />
            <Box sx={{ display: 'flex', gap: '6px' }}>
                {[1, 2, 3].map((i) => (
                    <Skeleton
                        key={i}
                        animation="wave"
                        variant="rectangular"
                        sx={{ width: '60px', height: '24px', borderRadius: '16px' }}
                    />
                ))}
            </Box>
        </CardContent>
        <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', px: '12px', pb: '12px', gap: '8px' }}
        >
            <Skeleton animation="wave" variant="circular" sx={{ width: 28, height: 28 }} />
            <Skeleton animation="wave" variant="circular" sx={{ width: 28, height: 28 }} />
        </Box>
    </Card>
)

export default ProjectCardSkeleton
