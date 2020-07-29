declare global {

  export interface Map<K, V> {

    getDefined<K, V>(this: Map<K, V>, key: K): V

  }

}

Map.prototype.getDefined = <K, V>(key: K): V => {
  return this.get(key)!
}
