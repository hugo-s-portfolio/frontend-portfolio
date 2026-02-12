export interface AboutMeMenuResponse {
    success: boolean
    statusCode: number
    message: string
    data: AboutMeMenuConfig[]
    timestamp: string
    path: string
}

export interface AboutMeMenuConfig {
    id?: number
    enable?: boolean
    order?: number
    menuName?: string
    title?: string
    description?: string
    maintenanceMode?: boolean
    country?: string
    menuType?: string
}

export interface AboutMeMenuResult {
    code?: number
    status?: string
    resultMessage?: AboutMeMenuResultMessage
}

export interface AboutMeMenuResultMessage {
    value?: string
    formattedValue?: string
    show?: boolean
}
