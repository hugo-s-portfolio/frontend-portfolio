import { ReactElement } from 'react'

// components
import { MainLayout, MobileMenu } from '@/infrastructure/ui/components'

export const getLayout = (page: ReactElement): ReactElement => {
    const options = page.props.children.props.config.dataObject.frontend.options || []
    const initialValue = page.props.children.props.config.dataObject.frontend.initialValue || 0

    return (
        <MainLayout metaData={page.props.children.props?.config?.dataObject?.frontend?.metadata}>
            {page}
            <MobileMenu options={options} initialValue={initialValue} />
        </MainLayout>
    )
}
