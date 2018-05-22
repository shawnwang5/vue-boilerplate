import { store } from '../../store'
import { TOAST } from '../../store/modules/global-components'

const storeData: any = store.state
const gCS = storeData.globalComponents

export class ToastUtils {
    static show (content = '提示', autoCloseTime = 2000) {
        store.commit(TOAST, { content, autoCloseTime })
        if (gCS.toast.vnode) {
            gCS.gVnode.showToast(content, autoCloseTime)
        }
    }

    static hide () {
        if (gCS.toast.vnode) {
            gCS.gVnode.hideToast()
        }
    }
}
