declare const window: any
declare const document: any

const { debounce } = require('throttle-debounce')

export class RemResponsiveUtils {
    static baseFontSize = 100
    static baseDocWidth = 750
    static maxDocWidth = 750
    static minDocWidth = 320

    static onResize () {
        let docWidth: number = document.documentElement.clientWidth
        if (docWidth > RemResponsiveUtils.maxDocWidth) {
            docWidth = RemResponsiveUtils.maxDocWidth
        } else if (docWidth < RemResponsiveUtils.minDocWidth) {
            docWidth = RemResponsiveUtils.minDocWidth
        }
        document.querySelector('html').style.fontSize = (docWidth / RemResponsiveUtils.baseDocWidth) * RemResponsiveUtils.baseFontSize + 'px'
    }

    static init () {
        RemResponsiveUtils.onResize()
        const doResize = debounce(500, RemResponsiveUtils.onResize)
        window.addEventListener('resize', doResize)
    }
}