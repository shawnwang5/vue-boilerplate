import { store } from '../../store'
import { ALERT_DIALOG } from '../../store/modules/global-components'

export interface SimpleAlertConfig {
    title?: string
    content?: string
    isShowOkBtn?: boolean
    okBtnFn?: Function | null
}

const storeData: any = store.state
const gCS = storeData.globalComponents

export class AlertUtils {
    /**
     * 显示简单 alert
     */
    static showSimpleAlert (opts: SimpleAlertConfig) {
        const {
            title = '',
            content = '',
            isShowOkBtn = true,
            okBtnFn = null,
        } = opts
        store.commit(ALERT_DIALOG, { title, content, isShowOkBtn, okBtnFn })
        if (gCS.alertDialog.vnode) {
            gCS.gVnode.showAlertDialog(title, content, isShowOkBtn, okBtnFn)
        }
    }
}
