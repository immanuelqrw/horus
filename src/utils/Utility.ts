export type Nullable<T> = T | null
export type Undefinable<T> = T | undefined
export type Blankable<T> = T | null | undefined

export function isNullOrUndefined(variable: any): boolean {
  return (variable === undefined || variable === null)
}

export function isDefined(variable: any): boolean {
  return !isNullOrUndefined(variable)
}

export function isNotDefined(variable: any): boolean {
  return !isDefined(variable)
}

export function clamp(num: number, min: number, max: number): number {
  return num <= min ? min : num >= max ? max : num
}

export function inclusiveFullRange(start: number, end: number): number[] {
  return [...Array(1 + end - start).keys()].map(v => start + v)
}

export function exclusiveFullRange(start: number, end: number): number[] {
  return [...Array(end - start).keys()].map(v => start + v)
}

export function range(end: number): number[] {
  return [...Array(end).keys()]
}

export function parseIntBase10(num: string): number {
  return parseInt(num, 10)
}


export function isFraction(num: string): boolean {
  if (!isNaN(parseIntBase10(num))) {
    return true
  }

  const numParts: string[] = num.split("/")
  const numerator: number = parseIntBase10(numParts[0])
  const denominator: number = parseIntBase10(numParts[1])

  return ((numParts.length === 2) && (!isNaN(numerator) && (!isNaN(denominator))))
}

export function incFraction(num: string): string {
  if (!isNaN(parseIntBase10(num))) {
    return `1/${num}`
  }

  const numParts: string[] = num.split("/")
  if (numParts.length !== 2) {
    return "NaF"
  }

  let numerator: number = parseIntBase10(numParts[0])
  const denominator: number = parseIntBase10(numParts[1])

  if (numerator - denominator < 0) {
    numerator++
  }

  return numParts.join("/")
}

export function decFraction(num: string): string {
  if (!isNaN(parseIntBase10(num))) {
    return num
  }

  const numParts: string[] = num.split("/")
  if (numParts.length !== 2) {
    return "NaF"
  }

  let numerator: number = parseIntBase10(numParts[0])
  const denominator: number = parseIntBase10(numParts[1])

  if (numerator > 1) {
    numerator--
    return numParts.join("/")
  }
  else {
    return `${denominator}`
  }
}

export function isWhole(num: string) {
  if (!isNaN(parseIntBase10(num))) {
    return false
  }

  const numParts: string[] = num.split("/")
  if (numParts.length !== 2) {
    return false
  }

  const numerator: number = parseIntBase10(numParts[0])
  const denominator: number = parseIntBase10(numParts[1])

  return numerator === denominator
}

// This function checks if the specified event is supported by the browser.
// Source: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
export function isEventSupported(eventName: string): boolean {
  const el: Nullable<HTMLDivElement> = document.createElement("div")

  eventName = `on${eventName}`
  let isSupported = (eventName in el)

  if (!isSupported) {
    // ! Might be broken
    el.setAttribute(eventName, "return;")
    const eventAttribute = el.getAttribute(eventName)
    isSupported = typeof eventAttribute === "function"
  }

  return isSupported
}
