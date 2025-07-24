// models
import { Config, ConfigModuleModel } from '@/domain/models'

export const getModule = (config: Config): ConfigModuleModel => {
    const mapperModule: ConfigModuleModel = {
        forms: {},
        actions: {},
        formatting: {},
        dataObject: [],
    }

    if (config.form_objects) {
        config.form_objects.forEach((formObject) => {
            if (!formObject.name) return
            mapperModule.forms[formObject.name] = {
                ...formObject,
            }
        })
    }

    if (config.actions) {
        config.actions.forEach((action) => {
            if (!action.name) return
            mapperModule.actions[action.name] = {
                ...action,
            }
        })
    }

    if (config.formatting) {
        config.formatting.forEach((formatting) => {
            if (!formatting.key) return
            mapperModule.formatting[formatting.key] = formatting
        })
    }

    if (config.dataObjects) {
        mapperModule.dataObject = config.dataObjects
    }

    return mapperModule
}
