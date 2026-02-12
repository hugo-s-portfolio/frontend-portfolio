/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ResponseConfigModuleModel {
    success: boolean
    statusCode: number
    message: string
    timestamp : string
    path: string
    data: Data
}


export interface Data {
    documentId : string
    locale: string
    config?: Config
}

export interface Config {
    uid?: string
    title?: Title
    description?: string
    actions?: Action[]
    country?: string[]
    moduleName?: string
    moduleId?: string
    form_objects?: FormObject[]
    formatting?: KeyValue[]
    errorMapping?: ErrorMapping[]
    dataObjects?: any
}

export interface ErrorMapping {
    id?: string
    name?: string
    error_message?: string
}

export interface Access {
    id?: string
    name?: string
    description?: string
    permissions?: Permission[]
}

export interface Permission {
    id?: string
    name?: string
    connections?: Connection[]
}

export interface Action {
    icon?: ActionIcon
    name?: string
    show?: boolean
    type?: string
    label?: string
    action_url?: string
    parameters?: any[]
    show_label?: boolean
    target_action?: string
    access?: Access[]
    characteristics?: KeyValue[]
    apply_to_flows?: KeyValue[]
    isEnabled?: boolean
    version?: {
        min?: string
        max?: string
    }
}

export interface ActionIcon {
    url?: string
    name?: string
    show?: boolean
    tooltip?: string
}

export interface FormObject {
    icon?: FormObjectIcon
    name?: string
    show?: boolean
    type?: string
    subtype?: string
    label?: string
    parameters?: Parameter[]
    show_label?: boolean
    characteristics?: KeyValue[]
    placeholder_mask?: string
    input_format?: string
    attributes?: FormObject[]
    apply_to_flows?: KeyValue[]
    access?: Access[]
    apply_to_type_doc?: KeyValue[]
    optional?: boolean
    isEnabled?: boolean
    version?: {
        min?: string
        max?: string
    }
}

export interface FormObjectIcon {
    url?: string
    name?: string
    show?: boolean
    tooltip?: string
}

export interface Parameter {
    id?: string | number
    value?: string | any
    key?: string
}

export interface KeyValue {
    id?: string | number
    key?: string
    value?: any
    error?: {
        icon?: FormObjectIcon
        message?: string
    }
    active?: {
        icon?: FormObjectIcon
        message?: string
    }
    disabled?: {
        icon?: FormObjectIcon
        message?: string
    }
    current?: {
        icon?: FormObjectIcon
        message?: string
    }
}

export interface Title {
    name?: string
    show?: boolean
}

export interface Result {
    code?: number
    status?: string
    result_message?: ResultMessage
}

export interface ResultMessage {
    value?: string
    formattedValue?: string
    show?: boolean
}

export interface DataObject {
    key?: string
    value?: string
    formatted_value?: string
    description?: string
    name?: string
    show?: boolean
    formatting?: boolean
    label?: string
    icon?: FormObjectIcon
    parameters?: Parameter[]
    successful_message?: string
    status?: boolean
    menu_description?: string
}

export interface SelectDataObject {
    id?: number
    value?: string
    name?: string
    type?: string
    message?: string
    success?: boolean
    ocr_document_type?: string
    identification_type?: SelectDataObject[]
    ocr_validation_type?: string
    default?: boolean
}

interface Connection {
    id?: string
    name?: string
}
