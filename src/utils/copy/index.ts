export class CopyUtils {
    static copy(text: string) {
        return new Promise((resolve, reject) => {
            try {
                const inputEle = document.createElement('textarea')
                inputEle.value = text
                document.body.appendChild(inputEle)
                inputEle.select()
                inputEle.setSelectionRange(0, inputEle.value.length)
                if (document.execCommand('Copy', false)) {
                    resolve()
                } else {
                    reject('当前浏览器不支持复制操作，请使用Ctrl+C手动复制')
                }
                document.body.removeChild(inputEle)
            } catch (e) {
                reject(`复制出错：${e.message}`)
            }
        })
    }
}
