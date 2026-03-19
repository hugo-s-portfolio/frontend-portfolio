import { FC, ReactElement } from 'react'

// components
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip,
    IconButton,
    Typography,
} from '@/infrastructure/ui/components'

// interfaces
import { ProjectItem } from '@/infrastructure/ui/modules/ProjectsModule/interfaces'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// styles
import { StyledProjectCard } from './projectCard-styles'

export interface ProjectCardProps {
    project: ProjectItem
}

const ProjectCard: FC<ProjectCardProps> = ({ project }): ReactElement => {
    const { title, description, image, technologies, github_url, demo_url } = project

    return (
        <StyledProjectCard>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia sx={{ height: 180 }} image={image} title={title} />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: '12px' }}>
                        {description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {technologies.map((tech) => (
                            <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        ))}
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: '12px', pb: '12px' }}>
                    {github_url && (
                        <a href={github_url} target="_blank" rel="noopener noreferrer">
                            <IconButton aria-label="GitHub" size="small">
                                {getIcon('GitHub', { fontSize: 'small' })}
                            </IconButton>
                        </a>
                    )}
                    {demo_url && (
                        <a href={demo_url} target="_blank" rel="noopener noreferrer">
                            <IconButton aria-label="Demo" size="small">
                                {getIcon('OpenInNew', { fontSize: 'small' })}
                            </IconButton>
                        </a>
                    )}
                </CardActions>
            </Card>
        </StyledProjectCard>
    )
}

export default ProjectCard
