export class ValidatorUtils {
    static isPhone (phoneStr: string) {
        return /^1[3456789]\d{9}$/.test(phoneStr)
    }
}