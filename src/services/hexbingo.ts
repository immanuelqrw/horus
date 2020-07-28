import {Color, HEXS, INDICES_PER_ROW, SelectedHexClass} from "@services/Constants"
import {DocumentHelper} from "@utils/DocumentHelper"
import {inclusiveFullRange, isDefined, isNullOrUndefined, Nullable, parseIntBase10, range} from "@utils/Utility"
import $ from "jquery"
import seedrandom from "seedrandom"
import {decFraction, incFraction, isEventSupported, isFraction, isWhole} from "@utils/Utility"
import {BingoBoard} from "@services/BingoBoard"

let activeRows: string[] = []

export function setHexHover(index: number): void {
  const hex: HTMLElement = DocumentHelper.getElementById(`hex${index}`)
  const hexChild: HTMLElement = hex.childNodes[0] as HTMLElement
  hexChild.style.backgroundColor = Color.HEX_HOVER.valueOf()

  if (activeRows.length > 0) {
    return
  }

  const litIndices: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  INDICES_PER_ROW.forEach((value: number[]) => {
    for (const rowIndex of range(value.length)) {
      if (value[rowIndex] === index) {
        for (const innerIndex of range(value.length)) {
          litIndices[value[innerIndex]] = 1
        }
      }
    }
  })

  for (const litIndex of inclusiveFullRange(1, 19)) {
    if (litIndices[litIndex] === 0) {
      const litHex: HTMLElement = DocumentHelper.getElementById(`hex${litIndex}`)
      const litHexChild: HTMLElement = litHex.childNodes[0] as HTMLElement
      litHexChild.style.backgroundColor = Color.HEX_UNLIT.valueOf()
    }
  }
}

export function setRowHover(index: number): void {
  const hex: HTMLElement = DocumentHelper.getElementById(`row${index}`)
  const hexChild: HTMLElement = hex.childNodes[0] as HTMLElement
  hexChild.style.backgroundColor = Color.ROW_HOVER.valueOf()
}

export function clearRowHover(): void {
  for (const index of inclusiveFullRange(1, 5)) {
    const hex: HTMLElement = DocumentHelper.getElementById(`row${index}`)
    const hexChild: HTMLElement = hex.childNodes[0] as HTMLElement

    hexChild.style.backgroundColor = Color.NORMAL.valueOf()
  }
}

export function highlightRowHover(row: string): void {
  const litIndices: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  if (!row && activeRows.length === 0) {
    return
  }

  if (row) {
    if (activeRows.indexOf(row) === -1) {
      const hexHeader: HTMLElement = DocumentHelper.getElementById(`hexheader${row}`)
      hexHeader.style.backgroundColor = "blue"
    }

    const rowIndices: number[] = INDICES_PER_ROW.getDefined(row)
    for (const rowIndex of range(rowIndices.length)) {
      litIndices[rowIndices[rowIndex]] = 1
    }
  }

  for (const activeRow of range(activeRows.length)) {
    const activeRowKey: string = activeRows[activeRow]
    const activeRowIndices: number[] = INDICES_PER_ROW.getDefined(activeRowKey)
    for (const rowIndex of range(activeRowIndices.length)) {
      litIndices[activeRowIndices[rowIndex]] = 1
    }
  }

  for (const index of inclusiveFullRange(1, 19)) {
    const hex: HTMLElement = DocumentHelper.getElementById(`hex${index}`)
    const hexChild: HTMLElement = hex.childNodes[0] as HTMLElement
    if (litIndices[index] === 0) {
      hexChild.style.backgroundColor = Color.ROW_UNLIT.valueOf()
    } else {
      hexChild.style.backgroundColor = Color.NORMAL.valueOf()
    }
  }
}

export function clearHover(): void {
  for (const key in INDICES_PER_ROW.keys()) {
    if (INDICES_PER_ROW.hasOwnProperty(key)) {
      if (activeRows.indexOf(key) === -1) {
        const hexHeader: Nullable<HTMLElement> = document.getElementById(`hexheader${key}`)
        if (isDefined(hexHeader)) {
          hexHeader!.style.backgroundColor = Color.NORMAL.valueOf()
        }
      }
    }
  }
  checkBadRow()

  for (const index of inclusiveFullRange(1, 19)) {
    const hex: Nullable<HTMLElement> = document.getElementById(`hex${index}`)
    if (isDefined(hex)) {
      const hexChild: HTMLElement = hex!.childNodes[0] as HTMLElement
      hexChild.style.backgroundColor = Color.NORMAL.valueOf()
    }
  }
}

export function handleRowClick(row: string): void {
  const hexHeader: HTMLElement = DocumentHelper.getElementById(`hexheader${row}`)

  if (activeRows.indexOf(row) !== -1) {
    hexHeader!.style.backgroundColor = Color.NORMAL.valueOf()
    activeRows.splice(activeRows.indexOf(row), 1)
    clearHover()
    return
  }

  activeRows.push(row)
  // - Consider moving this backgroundColor to constant
  hexHeader!.style.backgroundColor = "green"
  clearHover()
}

export function hasClass(el: HTMLElement, className: string): boolean {
  if (el.classList) {
    return el.classList.contains(className)
  } else {
    if (isNullOrUndefined(el.className)) {
      return false
    }
    return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`))
  }
}

function addClass(el: HTMLElement, className: string): void {
  if (el.classList) {
    el.classList.add(className)
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`
  }
}

function removeClass(el: HTMLElement, className: string): void {
  if (el.classList) {
    el.classList.remove(className)
  } else if (hasClass(el, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`)

    el.className = el.className.replace(reg, " ")
  }
}

function highlightAsCompleted(el: HTMLElement) {
  addClass(el, SelectedHexClass.GREEN)
}

function highlightAsIgnored(el: HTMLElement) {
  addClass(el, SelectedHexClass.RED)
}

function removeCompletedHighlight(el: HTMLElement): void {
  removeClass(el, SelectedHexClass.GREEN)
}

function removeIgnoredHighlight(el: HTMLElement): void {
  removeClass(el, SelectedHexClass.RED)
}

function isCompleted(el: HTMLElement): boolean {
  return hasClass(el, SelectedHexClass.GREEN)
}

function isIgnored(el: HTMLElement): boolean {
  return hasClass(el, SelectedHexClass.RED)
}

export function handleHexLeftClick(hex: HTMLElement, next: number): void {
  if (!isCompleted(hex)) {
    highlightAsCompleted(hex)

    if (next) {
      $(`#row${next}`).show()
      fitToParent(".rowspan")
    }
  } else {
    removeCompletedHighlight(hex)
  }
  removeIgnoredHighlight(hex)
  checkBadRow()
}

export function handleHexRightClick(hex: HTMLElement): void {
  if (!isIgnored(hex)) {
    highlightAsIgnored(hex)
  } else {
    removeIgnoredHighlight(hex)
  }

  removeCompletedHighlight(hex)
  checkBadRow()
}

export function checkBadRow(): void {
  for (const key in INDICES_PER_ROW) {
    if (INDICES_PER_ROW.hasOwnProperty(key)) {
      const rowHeader: Nullable<HTMLElement> = document.getElementById(`hexheader${key}`)

      if (isNullOrUndefined(rowHeader)) {
        continue
      }

      if (rowHeader!.style.backgroundColor === "darkred" || rowHeader!.style.backgroundColor === "") {
        rowHeader!.style.backgroundColor = Color.NORMAL.valueOf()

        let isHexComplete: boolean = true
        const rowIndices: number[] = INDICES_PER_ROW.getDefined(key)

        for (const rowIndex of range(rowIndices.length)) {
          const hex: Nullable<HTMLElement> = document.getElementById(`"hex${rowIndices[rowIndex]}`)
          if (isDefined(hex)) {
            const nonNullHex: HTMLElement = hex!

            if (!isCompleted(nonNullHex)) {
              isHexComplete = false
            }

            if (isIgnored(nonNullHex)) {
              rowHeader!.style.backgroundColor = "darkred"
              break
            }
          }
        }

        if (isHexComplete) {
          rowHeader!.style.backgroundColor = "gold"
        }
      }
    }
  }
}

// ! Need to extract this part
window.onload = loadPage
export function loadPage() {
  const parts = window.location.search.substr(1).split("&")
  const $_GET = {}
  for (const index of range(parts.length)) {
    const temp = parts[index].split("=")
    $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1])
  }

  const seed: string = $_GET.seed ?? ""

  const seedInput: HTMLInputElement = document.getElementById("rngseed") as HTMLInputElement
  if (isDefined(seedInput)) {
    seedInput.value = seed
  }

  // - Set default in configuration
  const gameName: string = $_GET.game ?? "botw-mount"
  const game: string = `${gameName}.js`

  const bingoGameInput: HTMLInputElement = document.getElementById("bingogame") as HTMLInputElement
  if (isDefined(bingoGameInput)) {
    bingoGameInput.value = game
  }

  const type: string = $_GET.type ?? "hex"

  const bingoTypeInput: HTMLInputElement = document.getElementById("bingotype") as HTMLInputElement
  if (isDefined(bingoTypeInput)) {
    bingoTypeInput.value = type
  }

  loadGoals(new BingoBoard().generateBoard)

  $(".hexheaderIn").on( {
    "mouseleave"() { clearHover() }
  })


  // Check which wheel event is supported. Don"t use both as it would fire each event
  // in browsers where both events are supported.
  const wheelEvent = isEventSupported("mousewheel") ? "mousewheel" : "wheel"

  // Now bind the event to the desired element
  $(".hexIn").on(wheelEvent, function(e) {
    const oEvent: WheelEvent = e.originalEvent as WheelEvent
    const delta = -oEvent.deltaY

    const goal = this.childNodes[1].innerText.split(" ")
    let counter = false
    if (delta > 0) {
      // Scrolled up
      if (isIgnored(this)) {
        removeIgnoredHighlight(this)
        checkBadRow()
        return
      }

      for (const index of range(goal.length)) {
        if (isFraction(goal[index])) {
          const num = incFraction(goal[index])
          if (num !== "NaF" && num !== goal[index]) {
            goal[index] = num
            counter = true

            if (isWhole(num)) {
              highlightAsCompleted(this)
            } else {
              removeCompletedHighlight(this)
            }
            removeIgnoredHighlight(this)
            checkBadRow()
          }
        }
      }
      if (!counter) {
        highlightAsCompleted(this)
        removeIgnoredHighlight(this)
        checkBadRow()
      }
    } else {
      // Scrolled down
      for (const index of range(goal.length)) {
        if (isNaN(goal[index]) && isFraction(goal[index])) {
          const num = decFraction(goal[index])

          if (num !== "NaF" && num !== goal[index]) {
            goal[index] = num
            counter = true
            removeCompletedHighlight(this)
            removeIgnoredHighlight(this)
            checkBadRow()
          }
        }
      }

      if (!counter) {
        if (isCompleted(this)) {
          removeCompletedHighlight(this)
        } else {
          highlightAsIgnored(this)
        }
        checkBadRow()
      }

    }
    this.childNodes[1].innerText = goal.join(" ")
  })
  // Now bind the event to the desired element
  $(".rowcell").on(wheelEvent, function(e) {
    const oEvent: WheelEvent = e.originalEvent as WheelEvent
    const delta = -oEvent.deltaY

    const goal = this.childNodes[0].innerText.split(" ")
    let counter = false
    if (delta > 0) {
      // Scrolled up
      if (isIgnored(this)) {
        removeIgnoredHighlight(this)
        checkBadRow()
        return
      }

      for (const index of range(goal.length)) {
        if (isFraction(goal[index])) {
          const num = incFraction(goal[index])
          if (num !== "NaF" && num !== goal[index]) {
            goal[index] = num
            counter = true

            if (isWhole(num)) {
              $("#row" + (parseIntBase10(this.id[3]) + 1)).show()
              // - consider changing this as a separate helper method
              fitToParent(".rowspan")
            } else {
              removeCompletedHighlight(this)
            }
            removeIgnoredHighlight(this)
            checkBadRow()
          }
        }
      }
      if (!counter) {
        highlightAsCompleted(this)
        $("#row" + (parseIntBase10(this.id[3]) + 1)).show()
        fitToParent(".rowspan")
        removeIgnoredHighlight(this)
        checkBadRow()
      }
    } else {
      // Scrolled down
      for (const index of range(goal.length)) {
        // - Look into extracting this snippet
        if (isNaN(goal[index]) && isFraction(goal[index])) {
          const num = decFraction(goal[index])
          if (num !== "NaF" && num !== goal[index]) {
            goal[index] = num
            counter = true
            removeCompletedHighlight(this)
            removeIgnoredHighlight(this)
            checkBadRow()
          }
        }
      }
      if (!counter) {
        if (isCompleted(this)) {
          removeCompletedHighlight(this)
        } else {
          highlightAsIgnored(this)
        }
        checkBadRow()
      }
    }
    this.childNodes[0].innerText = goal.join(" ")
  })
}

export default function loadGoals(callback: () => {}) {
  const htmlSelectElement: HTMLElement = DocumentHelper.getElementById("bingogame")
  const options: HTMLSelectElement = htmlSelectElement! as HTMLSelectElement

  let goalInput: string = options.value
  if (goalInput === "URL") {
    goalInput = prompt("Enter URL to bingo goal list JavaScript file") ?? ""
    const option: HTMLOptionElement = document.createElement("option")
    option.text = goalInput
    option.selected = true
    option.disabled = true
    option.hidden = true
    options.add(option)
    option.selected = true
  } else if (goalInput === "JSON") {
    goalInput = prompt("Paste JSON object of the bingo goal list") ?? ""
    window.window.bingoGoals = JSON.parse(goalInput)
    return
  } else {
    goalInput = `goals/${goalInput}`
  }

  const script: HTMLScriptElement = document.createElement("script")
  script.type = "text/javascript"
  script.src = goalInput

  if (callback) {
    script.onload = callback
  }

  document.getElementsByTagName("head")[0].appendChild(script)
}


/**
 * Fit all elements matching a given CSS selector to their parent elements"
 * width and height, by adjusting the font-size attribute to be as large as
 * possible. Uses binary search.
 */
export function fitToParent(selector: string): void {
  const numIter: number = 5  // Number of binary search iterations
  const regexp: RegExp = /\d+(\.\d+)?/
  const fontSize = (elem: JQuery) => {
    const match = elem.css("font-size").match(regexp)
    const size = match === null ? 16 : parseFloat(match[0])
    return isNaN(size) ? 16 : size
  }

  const sizes: number[] = []
  $(selector).each(function() {
    const elem: JQuery = $(this)
    const parentWidth: Undefinable<number> = elem.parent().outerWidth()
    const parentHeight: Undefinable<number> = elem.parent().height()

    let maxSize = 50
    let minSize = 0.1
    let currSize = (minSize + maxSize) / 2
    elem.css("overflow-wrap", "break-word")

    for (const index of range(numIter)) {
      currSize = (minSize + maxSize) / 2
      elem.css("font-size", currSize)
      const elemHeight: Undefinable<number> = elem.outerHeight()
      if ((elemHeight! > parentHeight!)) {
        maxSize = currSize
      } else {
        minSize = currSize
      }
    }

    elem.css("right", "auto")
    elem.css("overflow-wrap", "normal")
    do {
      const elemWidth: Undefinable<number> = elem.outerWidth()
      if (elemWidth! > parentWidth!) {
        currSize--
        elem.css("font-size", currSize)
        minSize = currSize
      } else {
        break
      }
    } while (true)

    elem.css("right", "")
    elem.css("font-size", minSize)

    sizes.push(Number(elem.css("font-size").slice(0, -2)))
  })

  // ! Add statistic interface
  const stats = CalculateStatistic(sizes)
  const maxStatSize = stats.mean - stats.std

  $(selector).each(function(i, elem) {
    const currentSize = sizes[i]
    if (currentSize > maxStatSize) {
      // $(this).css("font-size", maxSize);
    }
    if (currentSize >= 4) {
      $(this).css("font-size", 10)
    } else if (currentSize >= 2 && currentSize <= 3) {
      $(this).css("font-size", 6)
    } else {
      $(this).css("font-size", 5)
    }
  })
}

export function CalculateStatistic(numbers: number[]) {
  if (!numbers || !numbers.length) {
    return false
  }

  const min: number = Math.min(...numbers)
  const max: number = Math.max(...numbers)

  const sum: number = numbers.reduce((a, b) => a + b)
  const mean: number = sum / numbers.length

  const squaredDifferences = numbers.map(x => Math.pow(x - mean, 2))

  const standardDeviation = Math.sqrt(squaredDifferences.reduce((a, b) => a + b)
    / (squaredDifferences.length - 1))


  return {
    sum,
    mean,
    std: standardDeviation,
    min,
    max
  }
}



window.window.bingo = {}

export function generateBoard() {
  for (const index of inclusiveFullRange(1, 19)) {
    const hex: Nullable<HTMLElement> = document.getElementById(`hex${index}`)

    if (isDefined(hex)) {
      removeCompletedHighlight(hex!)
      removeIgnoredHighlight(hex!)
    }
  }

  for (const index of inclusiveFullRange(1, 5)) {
    const row: Nullable<HTMLElement> = document.getElementById(`row${index}`)

    if (isDefined(row)) {
      removeCompletedHighlight(row!)
      removeIgnoredHighlight(row!)
    }
  }

  activeRows = []
  clearHover()

  if (window.bingo.rules) {
    $("#rulesbutton").show()
    const xmlString = window.bingo.rules
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, "text/html")
    document.getElementById("rules")?.replaceChild(doc.firstChild!, document.getElementById("rules")?.childNodes[1]!)
  } else {
    $("#rulesbutton").hide()
  }

  if (window.bingo.tips) {
    $("#tipsbutton").show()
    const xmlString = window.bingo.tips
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, "text/html")
    document.getElementById("tips")?.replaceChild(doc.firstChild!, document.getElementById("tips")?.childNodes[1]!)
  } else {
    $("#tipsbutton").hide()
  }

  const txtRNG = document.getElementById("rngseed")
  let rngSeed = txtRNG!.value
  if (rngSeed === undefined || rngSeed === "") {
    seedrandom()
    rngSeed = Math.floor(Math.random() * 1000000).toString()
  }
  txtRNG!.value = ""
  const seedDisplay: HTMLElement = DocumentHelper.getElementById("seeddisplay")
  seedDisplay!.innerText = rngSeed

  const bingoTypeSelector: HTMLSelectElement = DocumentHelper.getElementById("bingotype") as HTMLSelectElement
  const bingoType: string = bingoTypeSelector.value

  const bingoGameSelector: HTMLSelectElement = DocumentHelper.getElementById("bingogame") as HTMLSelectElement
  const bingoGame: string = bingoGameSelector.value.split(".")[0]

  window.history.replaceState(null, document.title, `?seed=${rngSeed}&game=${bingoGame}&type=${bingoType}`)

  seedrandom(rngSeed)

  if (bingoType === "hex") {
    $("#rowContainer").hide()
    $("#hexContainer").show()
  }
  else if (bingoType === "mission") {
    $("#rowContainer").show()
    $("#hexContainer").hide()
  }

  const bingoGenerator = generateBingoBoard(window.bingo,
  {
    "mode": "normal",
    "seed": rngSeed
  })

  window.card = false
  let iterations = 0
  while (!window.card && iterations < 10) {
    if (bingoType === "hex"){
      window.card = bingoGenerator.makeCard()
    } else if (bingoType === "mission") {
      window.card = bingoGenerator.makeMissions()
    }
    iterations++
  }

  if (!window.card) { window.card = {} }
  window.card.meta = {
    iterations
  }

  // - Consider making bingo type an enum
  if (bingoType === "hex") {
    for (const index of inclusiveFullRange(1, HEXS)) {
      if (window.card[index] === undefined) {
        continue
      }
      DocumentHelper.getElementById(`hex${index}`).childNodes[1].innerText = window.card[index].name
    }
    fitToParent(".hexspan")
  } else if (bingoType === "mission") {
    if (window.card[1] === undefined) {
      return
    }

    document.getElementById("row1")!.childNodes[0].innerText = window.card[1].name
    document.getElementById("row2")!.childNodes[0].innerText = window.card[5].name
    document.getElementById("row3")!.childNodes[0].innerText = window.card[10].name
    document.getElementById("row4")!.childNodes[0].innerText = window.card[15].name
    document.getElementById("row5")!.childNodes[0].innerText = window.card[19].name

    $("#row2").hide()
    $("#row3").hide()
    $("#row4").hide()
    $("#row5").hide()

    fitToParent(".rowspan")
  }
}
