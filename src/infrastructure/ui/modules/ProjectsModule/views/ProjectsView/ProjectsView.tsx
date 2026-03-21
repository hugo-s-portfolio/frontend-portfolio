import { FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

// components
import { Box, ErrorCard, Typography } from '@/infrastructure/ui/components'
import { ProjectsGrid, ProjectsGridSkeleton } from '@/infrastructure/ui/modules/ProjectsModule/inc'

// store
import { onHideToastErrorProjectsPage, projectsPageSelector } from '@/domain/store/projectsUseCase'
import { onLoadProjectsPageConfig } from '@/domain/store/projectsUseCase/projectsPage/thunk'
import { AppDispatch } from '@/domain/store/store'

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
    const dispatch: AppDispatch = useDispatch()
    const { config, loading, error, errorShow } = useGetModuleConfig<ProjectsPageState>({
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
                    <ErrorCard
                        error={error}
                        showError={errorShow}
                        componentName="ProjectsView"
                        onClose={() => {
                            dispatch(onHideToastErrorProjectsPage())
                        }}
                    />
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
