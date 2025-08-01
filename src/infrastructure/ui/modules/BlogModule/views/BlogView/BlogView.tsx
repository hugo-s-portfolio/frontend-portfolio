import { FC, ReactElement } from 'react'

// models
import { ConfigModuleModel } from '@/domain/models'

// styles
import { StyledBlogView } from '@infrastructure/ui/modules/BlogModule/views/BlogView/blogView-style'

export interface BlogViewProps {
    config: ConfigModuleModel
    status: 'SUCCESS' | 'ERROR'
}

const BlogView: FC<BlogViewProps> = ({ status }): ReactElement => {
    return (
        <StyledBlogView>
            {status === 'SUCCESS' ? <p>BlogView</p> : <p>no hay nada</p>}
        </StyledBlogView>
    )
}

export default BlogView
