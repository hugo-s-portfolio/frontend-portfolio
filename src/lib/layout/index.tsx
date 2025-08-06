import { ReactElement } from 'react'

// components
import { MainLayout } from '@/infrastructure/ui/components'

export const getLayout = (page: ReactElement): ReactElement => {
    return (
        <MainLayout metaData={page.props.children.props?.config?.dataObject?.frontend?.metadata}>
            {page}
        </MainLayout>
    )
}
