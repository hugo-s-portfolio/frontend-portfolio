import { ReactElement } from 'react'

// components
import { MainLayout } from '@/infrastructure/ui/components'

// models
import { ConfigModuleModel } from '@/domain/models'

export interface PageProps {
    config?: ConfigModuleModel
}

export interface PageWithProps extends ReactElement {
    props: {
        children: {
            props: PageProps
        }
    }
}

export const getLayout = (page: PageWithProps): ReactElement => {
    return (
        <MainLayout metaData={page.props.children.props?.config?.dataObject?.frontend?.metadata}>
            {page}
        </MainLayout>
    )
}
