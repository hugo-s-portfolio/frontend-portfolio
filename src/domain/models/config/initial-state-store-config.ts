import { ConfigModuleModel } from './module.model'

export interface InitialStatenConfig {
    config: ConfigModuleModel
    loading: boolean
    error: unknown
}
