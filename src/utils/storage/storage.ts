import CryptoJS from 'crypto-js'

export const SECRET_PHRASE = 'secret_phrase'

export default class StorageUtils {
  static read(key: string, storage: any, encrypt = true) {
    try {
      let data = storage.getItem(key) || ''
      try {
        if (encrypt) {
          data = CryptoJS.AES.decrypt(data, SECRET_PHRASE).toString(
            CryptoJS.enc.Utf8,
          )
        }
      } catch (e) {
        console.error(e.message)
      }
      return data
    } catch (e) {
      console.error(e.message)
    }

    return ''
  }

  static write(key: string, data: string, storage: any, encrypt = true) {
    try {
      if (encrypt) {
        data = CryptoJS.AES.encrypt(data, SECRET_PHRASE).toString()
      }

      return storage.setItem(key, data)
    } catch (e) {
      console.error(e.message)
    }
  }

  static readJSON(key: string, storage: any, encrypt = true) {
    try {
      const data = StorageUtils.read(key, storage, encrypt)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error(e.message)
    }

    return null
  }

  static writeJSON(
    key: string,
    data: string | object,
    storage: any,
    encrypt = true,
  ) {
    try {
      if (typeof data === 'object') {
        data = JSON.stringify(data)
      }
      StorageUtils.write(key, data, storage, encrypt)
    } catch (e) {
      console.error(e.message)
    }
  }

  static each(fn: Function, storage: any, encrypt = true) {
    try {
      for (let i = storage.length - 1; i >= 0; i--) {
        const key = storage.key(i) || ''
        fn(StorageUtils.read(key, storage, encrypt), key)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  static remove(key: string, storage: any) {
    try {
      return storage.removeItem(key)
    } catch (e) {
      console.error(e.message)
    }
  }

  static clearAll(storage: any) {
    try {
      return storage.clear()
    } catch (e) {
      console.error(e.message)
    }
  }
}
