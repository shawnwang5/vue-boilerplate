const imageBase64HeaderMap = new Map<string, string>()
imageBase64HeaderMap.set('png', 'data:image/png;base64,')
imageBase64HeaderMap.set('jpeg', 'data:image/jpeg;base64,')
imageBase64HeaderMap.set('jpg', 'data:image/jpeg;base64,')
imageBase64HeaderMap.set('gif', 'data:image/gif;base64,')

const imageContentTypeMap = new Map<string, string>()
imageContentTypeMap.set('png', 'image/png')
imageContentTypeMap.set('jpeg', 'image/jpeg')
imageContentTypeMap.set('jpg', 'image/jpeg')
imageContentTypeMap.set('gif', 'image/gif')

export class FileUtils {
    static imageBase64HeaderMap = imageBase64HeaderMap
    static imageContentTypeMap = imageContentTypeMap

    /**
     * 以 dataURL 的形式读取文件内容
     * @param file 待读取的目标文件
     * @returns {Promise<string>}
     */
    static readFileAsDataURL (file: File) {
        return new Promise<string>((resolve, reject) => {
            if (file && FileReader) {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function (evt: any) {
                    resolve(evt.target.result)
                }
            } else {
                if (typeof FileReader === 'undefined') {
                    console.log('浏览器不支持FileReader')
                }
                resolve('')
            }
        })
    }

    static base64ToFile (b64Data: string, extension = 'png') {
        b64Data = b64Data.replace(FileUtils.imageBase64HeaderMap.get(extension) || '', '')
        const sliceSize = 512
        const byteCharacters = window.atob(b64Data)
        const byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize)
            const byteNumbers = new Array(slice.length)
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[ i ] = slice.charCodeAt(i)
            }
            const byteArray = new Uint8Array(byteNumbers)
            byteArrays.push(byteArray)
        }
        return new File(byteArrays, `image.${extension}`, { type: FileUtils.imageContentTypeMap.get(extension) })
    }
}
