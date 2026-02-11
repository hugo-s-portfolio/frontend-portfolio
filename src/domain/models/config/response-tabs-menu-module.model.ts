// export interface TabsMenuModuleResponse {
//     response?: TabsMenuResponse
// }

// export interface TabsMenuResponse {
//     result?: TabsMenuResult
//     config?: TabsMenuConfig[]
// }

export interface TabsMenuModuleResponse {
    success: boolean
    statusCode: number
    message: string
    timestamp : string
    path: string
    data: TabsMenuConfig[]
}

export interface TabsMenuConfig {
    id?: number
    label?: string
    enabled?: boolean
    icon?: string
    route?: string
    description?: string
    menuId?: number
    fontSize?: number
    menuName?: string
    menuType?: string
    country?: string
}

export interface TabsMenuResult {
    code?: number
    status?: string
    resultMessage?: TabsMenuResultMessage
}

export interface TabsMenuResultMessage {
    value?: string
    formattedValue?: string
    show?: boolean
}
