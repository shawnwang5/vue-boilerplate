export class UrlUtils {
  static getValue(searchStr: string, paramName: string): string {
    if (searchStr.startsWith("?")) {
      searchStr = searchStr.substring(1);
    }
    const reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
    const result = searchStr.match(reg);
    if (result !== null) {
      return decodeURIComponent(result[2]);
    }
    return "";
  }

  static stringify(paramObj: any): string {
    return Object.keys(paramObj)
      .map((key: string) => `${key}=${paramObj[key]}`)
      .join("&");
  }

  static parse(searchStr: string): string {
    if (searchStr.startsWith("?")) {
      searchStr = searchStr.substring(1);
    }
    const query: any = {};
    const pairs = searchStr.split("&");
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split("=");
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]) || "";
      query[key] = decodeURIComponent(value);
    }
    return query;
  }
}
