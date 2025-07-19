/* eslint-disable @typescript-eslint/no-empty-interface */
export interface StrapiModuleResponse {
    data?: Data
    meta?: Meta
}

export interface Data {
    documentID?: string
    createdAt?: Date
    updatedAt?: Date
    publishedAt?: Date
    locale?: string
    localizations?: any[]
    config?: Config
}

export interface Config {
    uid?: string
    moduleName?: string
    title?: Title
    moduleID?: string
    description?: string
    country?: string[]
    actions?: Action[]
    formObjects?: Action[]
    formatting?: Formatting[]
    dataObjects?: DataObjects
}

export interface Action {
    name?: string
    type?: string
    label?: string
    show?: boolean
    parameters?: Formatting[]
    icon?: Icon
}

export interface Icon {
    alt?: string
    url?: string
    show?: boolean
}

export interface Formatting {
    key?: string
    value?: string
}

export interface DataObjects {
    backend?: Meta
    frontend?: Frontend
}

export interface Meta {}

export interface Frontend {
    options?: Option[]
    connections?: Connection[]
}

export interface Connection {
    key?: string
    name?: string
    value?: string
    parameters?: Formatting[]
}

export interface Option {
    id?: number
    icon?: string
    label?: string
    fontSize?: number
}

export interface Title {
    title?: string
    show?: boolean
}
