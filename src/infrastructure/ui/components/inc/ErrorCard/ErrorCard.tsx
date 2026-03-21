import React, { FC, ReactElement, useEffect, useState } from 'react'
import { AxiosError } from 'axios'

// base components
import { Alert, Box, Snackbar, Typography } from '@/infrastructure/ui/components'

// utils
import { getIcon } from '@/infrastructure/ui/utils/icons'

interface ErrorCardProd {
    error: unknown
    showError?: boolean
    isOpen?: boolean
    componentName?: string
    duration?: number
    onClose?: () => void
}

const ErrorCard: FC<ErrorCardProd> = ({
    error,
    showError = true,
    componentName,
    duration,
    isOpen = false,
    onClose,
}): ReactElement => {
    const [open, setOpen] = useState(isOpen)

    const handleClose = (): void => {
        setOpen(false)
        onClose?.()
    }

    useEffect(() => {
        if (error !== null) {
            setOpen(true)
        }
    }, [error])

    return (
        <>
            {showError ? (
                <Snackbar
                    open={open}
                    autoHideDuration={duration ?? 6000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
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
                            <Typography variant="caption" color="black">
                                {`${componentName} `} {(error as AxiosError)?.message}
                            </Typography>
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
            ) : (
                <></>
            )}
        </>
    )
}

export default ErrorCard
