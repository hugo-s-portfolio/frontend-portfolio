import { FC, ReactElement } from 'react'

// components
import { Box, Typography } from '@/infrastructure/ui/components'
import { ProjectsGrid, ProjectsGridSkeleton } from '@/infrastructure/ui/modules/ProjectsModule/inc'

// store
import { projectsPageSelector } from '@/domain/store/projectsUseCase'
import { onLoadProjectsPageConfig } from '@/domain/store/projectsUseCase/projectsPage/thunk'

// hooks
import { useGetModuleConfig } from '@/infrastructure/ui/hooks/useGetModuleConfig'

// interfaces
import { ProjectsPageState } from '@/domain/store/projectsUseCase'

// styles
import { StyledProjectsView } from '@infrastructure/ui/modules/ProjectsModule/views/ProjectsView/projectsView-style'

// icons
import { getIcon } from '@/infrastructure/ui/utils/icons'

// enums and models
import { ProjectsModules } from '../../enums'
import { Countries } from '@/domain/models'

export interface ProjectsViewProps {
    test?: string
}

const ProjectsView: FC<ProjectsViewProps> = (): ReactElement => {
    const { config, loading, error } = useGetModuleConfig<ProjectsPageState>({
        selector: projectsPageSelector,
        thunkAction: onLoadProjectsPageConfig({
            country: Countries.CO,
            moduleName: ProjectsModules.ModuleProjectsPage,
        }),
    })

    return (
        <StyledProjectsView>
            {error !== null && (
                <>
                    <p>Hay un error </p>
                    <ProjectsGridSkeleton />
                </>
            )}
            {!loading ? (
                <>
                    <Box sx={{ display: 'flex', flexDirection: 'row', mb: '24px' }}>
                        {config?.forms?.title?.icon?.show && (
                            <>
                                {getIcon(config?.forms?.title?.icon?.url ?? 'Work', {
                                    color: 'primary',
                                })}
                            </>
                        )}
                        {config?.forms?.title?.show && (
                            <Typography variant="h2" sx={{ ml: '8px', fontWeight: '500' }}>
                                {config?.forms?.title?.label}
                            </Typography>
                        )}
                    </Box>
                    <ProjectsGrid projects={config?.dataObject?.frontend?.projects_list} />
                </>
            ) : (
                <ProjectsGridSkeleton />
            )}
        </StyledProjectsView>
    )
}

export default ProjectsView
