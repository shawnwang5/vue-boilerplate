import { environments } from '@/environments'
import { UrlUtils } from '@/utils/url'

const wechat: any = require('weixin-js-sdk')
wechat.hideAllNonBaseMenuItem()
const appId = environments.wechatAppId

export class WechatUtils {
    static wechatConfig: any = {
        debug: false,
        appId,
        timestamp: '',
        nonceStr: '',
        signature: '',
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideMenuItems',
        ],
    }

    static modifyDocumentTitle(title: string) {
        let ua = navigator.userAgent
        document.title = title
        if (WechatUtils.isWechat() && ua.indexOf('iPhone') > -1) {
            var iframe = document.createElement('iframe')
            iframe.src = '/favicon.ico'
            iframe.style.display = 'none'
            document.body.appendChild(iframe)
            setTimeout(function() {
                document.body.removeChild(iframe)
            }, 100)
        }
    }

    static isWechat() {
        return /micromessenger/.test(navigator.userAgent.toLowerCase())
    }

    static getCode() {
        return UrlUtils.getValue(location.href, 'code')
    }

    static baseAuthentication() {
        const redirectUrl = encodeURIComponent(location.href)
        location.replace(
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base#wechat_redirect`
        )
    }

    static userAuthentication() {
        const redirectUrl = encodeURIComponent(location.href)
        location.replace(
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo#wechat_redirect`
        )
    }

    static initConfig(wechatConfig: any) {
        wechat.config(wechatConfig)
        WechatUtils.hideMenuItems()
    }

    static hideMenuItems() {
        wechat.ready(() => {
            wechat.hideMenuItems({
                menuList: [
                    'menuItem:share:qq',
                    'menuItem:share:weiboApp',
                    'menuItem:share:QZone',
                    'menuItem:openWithSafari',
                    'menuItem:openWithQQBrowser',
                    'menuItem:readMode',
                    'menuItem:copyUrl',
                    'menuItem:share:email',
                ],
            })
        })
    }

    static wechatShare(shareConfig: any) {
        wechat.ready(() => {
            // 分享到朋友圈
            wechat.onMenuShareTimeline({
                title: shareConfig.title,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success() {
                    if (typeof shareConfig.success === 'function') {
                        shareConfig.success()
                    }
                },
                cancel() {
                    if (typeof shareConfig.cancel === 'function') {
                        shareConfig.cancel()
                    }
                },
            })
            // 分享给朋友
            wechat.onMenuShareAppMessage({
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                type: 'link',
                dataUrl: '',
                success() {
                    if (typeof shareConfig.success === 'function') {
                        shareConfig.success()
                    }
                },
                cancel() {
                    if (typeof shareConfig.cancel === 'function') {
                        shareConfig.cancel()
                    }
                },
            })
        })
    }
}
