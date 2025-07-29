import { Action, FormObject } from '@/infrastructure/ui/interfaces'

export const findParameter = <T = unknown>(object: FormObject | Action, key: string): T => {
    return object?.parameters?.find((param) => param.key === key)?.value
}

export const findCharacteristic = <T = unknown>(object: FormObject | Action, key: string): T => {
    return object?.characteristics?.find((characteristic) => characteristic.key === key)?.value
}

export const replaceTextByEntryText = (label: string, key: string, entryText: string): string => {
    return label?.replace(key, entryText)
}

export const calculateAge = (birthday: string): number => {
    const today: Date = new Date()
    const birth: Date = new Date(birthday)

    let age: number = today.getFullYear() - birth.getFullYear()
    const mes: number = today.getMonth() - birth.getMonth()

    if (mes < 0 || (mes === 0 && today.getDate() < birth.getDate())) {
        age--
    }

    return age
}
