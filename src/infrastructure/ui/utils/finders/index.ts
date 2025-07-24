import { Action, FormObject } from '@/infrastructure/ui/interfaces'

export const findParameter = <T = unknown>(object: FormObject | Action, key: string): T => {
    return object?.parameters?.find((param) => param.key === key)?.value
}

export const findCharacteristic = <T = unknown>(object: FormObject | Action, key: string): T => {
    return object?.characteristics?.find((characteristic) => characteristic.key === key)?.value
}
