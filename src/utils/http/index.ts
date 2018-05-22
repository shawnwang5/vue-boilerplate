import axios from 'axios'
import { AlertUtils } from '../alert'
import { router } from '../../routes/router'
import { UrlUtils } from '../url'

const errorMsgMap = new Map()
errorMsgMap.set('Network Error', '网络或服务器错误，请稍后再试')

export class HttpUtils {
    static get (path: string, opts = {}) {
        return new Promise(function (resolve, reject) {
            axios.get(path, opts)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }

    static post (path: string, data: any, opts = {}) {
        const DEFAULT_POST_OPTS = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        opts = { ...DEFAULT_POST_OPTS, ...opts }
        return new Promise(function (resolve, reject) {
            axios.post(path, UrlUtils.stringify(data), opts)
                .catch(function (error: any) {
                    if (typeof error.response === 'undefined') {
                        resolve({
                            code: -1,
                            message: errorMsgMap.get(error.message)
                        })
                    } else if (error.response.status === 500) {
                        try {
                            resolve(JSON.parse(error.response.data.message))
                        } catch (e) {
                            resolve({
                                code: error.response.status,
                                message: error.response.data.message
                            })
                        }
                    } else {
                        reject(error)
                    }
                })
                .then(function (response: any) {
                    if (response && response.data.code === 401) {
                        AlertUtils.showSimpleAlert({
                            title: response.data.message,
                            okBtnFn () {
                                router.push('/login')
                            }
                        })
                    } else if (response) {
                        resolve(response.data)
                    }
                })
        })
    }

    static uploadFile (path: string, formData: FormData) {
        return HttpUtils.post(path, formData, {
            'Content-Type': 'multipart/form-data',
        })
    }
}
