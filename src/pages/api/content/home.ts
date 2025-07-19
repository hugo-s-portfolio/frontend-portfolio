/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseConfigModuleModel } from '@pages/api/interfaces'
import { responseStructure, getConfig } from '@/lib'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseConfigModuleModel>,
) {
    switchCaseRoute(req, res)
}

const casesMethods = (
    req: NextApiRequest,
    res: NextApiResponse<ResponseConfigModuleModel>,
): Record<string, () => Promise<void> | void> => ({
    GET: () => getMenuConfig(req, res),
    POST: () => getMenuConfig(req, res),
    DEFAULT: () => notFountRequest(res),
})

const switchCaseRoute = (
    req: NextApiRequest,
    res: NextApiResponse<ResponseConfigModuleModel>,
): Promise<void> | void => {
    const methodArray = Object.keys(casesMethods(req, res))
    const flat = methodArray.find((method) => method === req.method) ?? false

    if (!flat) {
        return casesMethods(req, res)['DEFAULT']()
    }

    if (req.method) {
        return casesMethods(req, res)[req.method]()
    }
}

const notFountRequest = (res: NextApiResponse<ResponseConfigModuleModel>): void => {
    return res.status(404).json(
        responseStructure(
            {
                uid: 'dafaf',
                title: {
                    name: 'Not Found',
                    show: false,
                },
                description: 'Resource not found',
                actions: [],
                country: [],
                moduleName: '',
                moduleId: '',
                form_objects: [],
                formatting: [],
                dataObjects: {},
            },
            'ERROR',
        ),
    )
}

const getMenuConfig = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseConfigModuleModel>,
): Promise<void> => {
    try {
        const config = await getConfig({ country: 'CO', moduleName: 'module_test_page' })

        if (!config) return
        const response = responseStructure(config, 'SUCCESS')

        return res.status(200).send(response)
    } catch (error) {
        const response = responseStructure({}, 'ERROR')
        return res.status(200).send(response)
    }
}
