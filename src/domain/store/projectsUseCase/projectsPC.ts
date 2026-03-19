import { createMigrate, MigrationManifest } from 'redux-persist'
import { encrypt } from '../encrypt'
import { storage } from '../rootPersistConfig'

const migrations: MigrationManifest = {
    2: () => {
        return {} as never
    },
}

export const projectsPersistConfig = {
    key: 'projects',
    keyPrefix: 'portfolio-',
    storage,
    blacklist: [''],
    version: 2,
    migrate: createMigrate(migrations, { debug: false }),
    transforms: process.env.NODE_ENV !== 'development' ? [encrypt] : undefined,
}
