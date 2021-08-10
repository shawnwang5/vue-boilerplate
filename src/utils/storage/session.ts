import StorageUtils from './storage'

export class SessionStorageUtils {
  static read(key: string, encrypt = true) {
    return StorageUtils.read(key, sessionStorage, encrypt)
  }

  static readJSON(key: string, encrypt = true) {
    return StorageUtils.readJSON(key, sessionStorage, encrypt)
  }

  static write(key: string, data: string, encrypt = true) {
    return StorageUtils.write(key, data, sessionStorage, encrypt)
  }

  static writeJSON(key: string, data: string, encrypt = true) {
    return StorageUtils.writeJSON(key, data, sessionStorage, encrypt)
  }

  static each(fn: Function, encrypt = true) {
    return StorageUtils.each(fn, sessionStorage, encrypt)
  }

  static remove(key: string) {
    return StorageUtils.remove(key, sessionStorage)
  }

  static clearAll() {
    return StorageUtils.clearAll(sessionStorage)
  }
}
