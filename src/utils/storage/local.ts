import StorageUtils from './storage'

export class LocalStorageUtils {
  static read(key: string, encrypt = true) {
    return StorageUtils.read(key, localStorage, encrypt)
  }

  static readJSON(key: string, encrypt = true) {
    return StorageUtils.readJSON(key, localStorage, encrypt)
  }

  static write(key: string, data: string, encrypt = true) {
    return StorageUtils.write(key, data, localStorage, encrypt)
  }

  static writeJSON(key: string, data: string, encrypt = true) {
    return StorageUtils.writeJSON(key, data, localStorage, encrypt)
  }

  static each(fn: Function, encrypt = true) {
    return StorageUtils.each(fn, localStorage, encrypt)
  }

  static remove(key: string) {
    return StorageUtils.remove(key, localStorage)
  }

  static clearAll() {
    return StorageUtils.clearAll(localStorage)
  }
}
