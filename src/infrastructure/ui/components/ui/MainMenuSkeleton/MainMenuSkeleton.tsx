import React, { ReactElement } from 'react'

// components
import { DesktopMenuSkeleton, MobileMenuSkeleton } from '@/infrastructure/ui/components'

const MainMenuSkeleton = (): ReactElement => (
    <>
        <MobileMenuSkeleton />
        <DesktopMenuSkeleton />
    </>
)

export default MainMenuSkeleton
