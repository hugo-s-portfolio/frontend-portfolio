export interface AboutMeMenuResponse {
    response?: Response
}

export interface Response {
    result?: AboutMeMenuResult
    config?: AboutMeMenuConfig[]
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
