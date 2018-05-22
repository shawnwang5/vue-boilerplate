import { HttpUtils } from '../utils/http'
import { environments } from '../environments'

export class TemplateApi {
    static get (path: string, params = {}) {
        return HttpUtils.get(`${environments.apiBaseURL + path}`, { params })
    }

    static post (path: string, params = {}) {
        return HttpUtils.post(`${environments.apiBaseURL + path}`, params)
    }

    /**
     * xxx
     */
    static xxx () {
        return TemplateApi.post(`xxx`, {})
    }
}
