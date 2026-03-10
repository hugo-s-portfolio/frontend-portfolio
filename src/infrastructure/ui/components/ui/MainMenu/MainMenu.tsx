/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AxiosError } from 'axios'

// components
import { DesktopMenu, MainMenuSkeleton, MobileMenu } from '@/infrastructure/ui/components/ui'
import { Alert, Box, Snackbar, Typography } from '../../inc'

// models
import { Countries } from '@/domain/models'

// store
import { onLoadTabsMainMenu } from '@/domain/store/contentUseCase/tabsMenu/thunk'
import { menuMobileOptionSelector, TabsMenuState } from '@/domain/store/contentUseCase'

// utils
import { useGetModuleConfig } from '@/infrastructure/ui/hooks'
import { getIcon } from '@/infrastructure/ui/utils/icons'

export interface MainMenuProps {
    initialValue?: number
}

export enum MainMenuEnum {
    moduleTabs = 'module_tabs',
}

const MainMenu: FC<MainMenuProps> = ({ initialValue = 0 }): ReactElement => {
    const pathname = usePathname()

    const [value, setValue] = useState(initialValue)
    const [open, setOpen] = useState(false)

    const {
        config: options,
        loading,
        error,
    } = useGetModuleConfig<TabsMenuState>({
        selector: menuMobileOptionSelector,
        thunkAction: onLoadTabsMainMenu({
            country: Countries.CO,
            menuType: MainMenuEnum.moduleTabs,
        }),
    })

    const setInitialTab = (): void => {
        const routes = options?.map((opt) => ({
            route: opt?.route,
            index: opt?.menuId,
        }))

        routes?.find(({ route, index }) => {
            if (route === pathname && index) {
                setValue(index)
            }
        })
    }

    const handleClose = (): void => {
        setOpen(false)
    }

    useEffect(() => {
        if (error !== null) {
            setOpen(true)
        }
    }, [error])

    useEffect(() => {
        setInitialTab()
    }, [pathname])

    return (
        <>
            {error !== null ? (
                <>
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    >
                        <Alert
                            severity="error"
                            sx={{
                                width: '100%',
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Typography>{(error as AxiosError)?.message}</Typography>
                                {getIcon('Close', {
                                    color: 'error',
                                    sx: {
                                        marginLeft: '5px',
                                    },
                                    onClick: () => {
                                        handleClose()
                                    },
                                })}
                            </Box>
                        </Alert>
                    </Snackbar>
                    <MainMenuSkeleton />
                </>
            ) : (
                <>
                    {!loading ? (
                        <>
                            {pathname !== '/' && (
                                <>
                                    <MobileMenu options={options} initialValue={value} />
                                    <DesktopMenu options={options} />
                                </>
                            )}
                        </>
                    ) : (
                        <MainMenuSkeleton />
                    )}
                </>
            )}
        </>
    )
}

export default MainMenu
