export interface SessionResponse {
    response?: SessionResponse
}

export interface SessionResponse {
    result?: SessionResult
    config?: SessionConfig
}

export interface SessionConfig {
    jwt?: string
    user?: User
}

export interface User {
    id?: number
    documentID?: string
    username?: string
    email?: string
    provider?: string
    confirmed?: boolean
    blocked?: boolean
    createdAt?: Date
    updatedAt?: Date
    publishedAt?: Date
}

export interface SessionResult {
    code?: number
    status?: string
    resultMessage?: SessionResultMessage
}

export interface SessionResultMessage {
    value?: string
    formattedValue?: string
    show?: boolean
}
