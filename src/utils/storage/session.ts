export class SessionStorageUtils {
    static read (key: string): string {
        try {
            return window.sessionStorage.getItem(key) || ''
        } catch (e) {
            return ''
        }
    }

    static write (key: string, data: string) {
        try {
            return window.sessionStorage.setItem(key, data)
        } catch (e) {
        }
    }

    static each (fn: Function) {
        try {
            for (let i = window.sessionStorage.length - 1; i >= 0; i--) {
                const key = window.sessionStorage.key(i) || ''
                fn(SessionStorageUtils.read(key), key)
            }
        } catch (e) {
        }
    }

    static remove (key: string) {
        try {
            return window.sessionStorage.removeItem(key)
        } catch (e) {
        }
    }

    static clearAll () {
        try {
            return window.sessionStorage.clear()
        } catch (e) {
        }
    }
}
