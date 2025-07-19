import { FC, ReactElement } from 'react'

// interfaces
import { Blog } from '@infrastructure/ui/modules/HomeModule/interfaces'

// styles
import { StyledBlogView } from '@infrastructure/ui/modules/HomeModule/views/BlogView/blogView-style'

export interface BlogViewProps {
    blog?: Blog
}

const BlogView: FC<BlogViewProps> = (): ReactElement => {
    return <StyledBlogView>BlogView</StyledBlogView>
}

export default BlogView
