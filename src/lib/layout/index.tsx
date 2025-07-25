import { ReactElement } from 'react'

// components
import { MainLayout, MobileMenu } from '@/infrastructure/ui/components'

export const getLayout = (page: ReactElement): ReactElement => {
    const initialValue = page.props.children.props.config.dataObject.frontend.initialValue || 0

    const newOptions = page.props.children.props?.tabsMenu || []

    return (
        <MainLayout metaData={page.props.children.props?.config?.dataObject?.frontend?.metadata}>
            {page}
            {newOptions.length > 0 && (
                <MobileMenu options={newOptions} initialValue={initialValue} />
            )}
        </MainLayout>
    )
}
