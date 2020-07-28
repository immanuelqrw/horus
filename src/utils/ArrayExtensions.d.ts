import {inclusiveFullRange, range, Undefinable} from "@utils/Utility"

declare global {

  export interface Array<T> {

    hasDuplicates(this: T[]): boolean

    isEmpty(this: T[]): boolean

    sortNumerically(this: T[]): T[]

    stableSort(this: T[], func: (T, T) => Undefinable<number>): T[]

    shuffled(this: T[]): T[]

  }

}

Array.prototype.sortNumerically = (): T[] => {
  return this.stableSort((a, b) => a - b)
}

Array.prototype.stableSort = (compare: (T, T) => Undefinable<number>): T[] => {
  if (this.length === 0) {
    return []
  }

  if (!compare) {
    compare = (a, b) => a - b
  }

  let sorted = [this[0]]
  for (const i of inclusiveFullRange(1, this.length)) {
    let x = this[i]
    let j = sorted.length - 1
    while ((j >= 0) && (compare(sorted[j], x) > 0)) {
      sorted[j + 1] = sorted[j]
      j = j - 1
    }
    sorted[j + 1] = x
  }

  return sorted
}

Array.prototype.shuffled = (): T[] => {
  let toShuffle = this.slice()
  for (const i of range(toShuffle.length)) {
    let randElement = Math.floor(Math.random() * (i + 1))
    let temp = toShuffle[i]
    toShuffle[i] = toShuffle[randElement]
    toShuffle[randElement] = temp
  }
  return toShuffle
}

Array.prototype.hasDuplicates = (): boolean => {
  const uniqueElements: Set = new Set(this)
  return this.size === uniqueElements.size
}

Array.prototype.isEmpty = (): boolean => {
  return this.size === 0
}
