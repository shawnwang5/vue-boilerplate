declare const process: any

export const apiBaseUrlMap = new Map()
apiBaseUrlMap.set('development', '')
apiBaseUrlMap.set('test', '')
apiBaseUrlMap.set('production', '')
const nodeEnv: string = process.env.NODE_ENV || 'development'

export const environments = {
    docTitle: 'Vue Boilerplate',
    apiBaseURL: apiBaseUrlMap.get(nodeEnv),
    wechat: {
        appId: '',
    },
}