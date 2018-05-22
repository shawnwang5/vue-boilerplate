export class CopyUtils {
    static copy (text: string) {
        return new Promise((resolve, reject) => {
            try {
                const oInput = document.createElement('textarea')
                oInput.value = text
                document.body.appendChild(oInput)
                oInput.select()
                oInput.setSelectionRange(0, oInput.value.length)
                if (document.execCommand('Copy', true)) {
                    resolve('')
                } else {
                    reject('当前浏览器不支持复制操作，请使用Ctrl+C手动复制')
                }
                document.body.removeChild(oInput)
            } catch (e) {
                reject(`复制出错：${e}`)
            }
        })
    }
}
