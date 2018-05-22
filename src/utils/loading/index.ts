import { store } from '../../store'
import { LOADING } from '../../store/modules/global-components'

const storeData: any = store.state
const gCS = storeData.globalComponents

export class LoadingUtils {
    static show (tips = '请等待...') {
        store.commit(LOADING, { tips: tips })
        if (gCS.loading.vnode) {
            gCS.gVnode.showLoading(tips)
        }
    }

    static hide () {
        if (gCS.loading.vnode) {
            gCS.gVnode.hideLoading()
        }
    }
}
