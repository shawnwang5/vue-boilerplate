import axios from 'axios'
import { environments } from '../../environments'
import { LocalStorageUtils } from '../storage/local'

const uuidv1 = require('uuid/v1')

export class StatisticUtils {
    static init () {
        if (!LocalStorageUtils.read('shawn_uuid')) {
            LocalStorageUtils.write('shawn_uuid', uuidv1())
        }
    }

    static trackEvent (projectName: string, category: string, action: string, memo: string) {
        axios.post(`${environments.apiBaseUrl}statistic/trackEvent`, { projectName, category, action, memo })
    }

    static trackPV (projectName: string, path: string, memo: string) {
        axios.post(`${environments.apiBaseUrl}statistic/trackPV`, {
            projectName,
            uuid: LocalStorageUtils.read('shawn_uuid'),
            path,
            memo
        })
    }
}
