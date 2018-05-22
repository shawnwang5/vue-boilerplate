export class LocalStorageUtils {
    static read (key: string): string {
        try {
            return window.localStorage.getItem(key) || ''
        } catch (e) {
            return ''
        }
    }

    static write (key: string, data: string) {
        try {
            return window.localStorage.setItem(key, data)
        } catch (e) {
        }
    }

    static each (fn: Function) {
        try {
            for (let i = window.localStorage.length - 1; i >= 0; i--) {
                const key = window.localStorage.key(i) || ''
                fn(LocalStorageUtils.read(key), key)
            }
        } catch (e) {
        }
    }

    static remove (key: string) {
        try {
            return window.localStorage.removeItem(key)
        } catch (e) {
        }
    }

    static clearAll () {
        try {
            return window.localStorage.clear()
        } catch (e) {
        }
    }
}
