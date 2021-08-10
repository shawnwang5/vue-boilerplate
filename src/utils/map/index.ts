export class MapUtils {
  static getKeyByValue(map: Map<string, string>, value: string): string {
    let result = "";
    const iterator = map.entries();
    let nextEle = iterator.next();
    while (!nextEle.done) {
      if (nextEle.value[1] === value.toString()) {
        result = nextEle.value[0];
        break;
      }
      nextEle = iterator.next();
    }
    return result;
  }

  static toArray<K, V>(map: Map<K, V>): [[K, V]] {
    const result = [];
    const iterator = map.entries();
    let nextEle = iterator.next();
    while (!nextEle.done) {
      result.push(nextEle.value);
      nextEle = iterator.next();
    }
    return <[[K, V]]>result;
  }
}
