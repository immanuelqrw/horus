import {
  DIFFICULTIES,
  flipHex,
  HEXS, INDICES_PER_ROW,
  magicHex,
  MODE_TO_PROFILE,
  NORMAL_PROFILE, POPULATION_ORDER,
  Profile,
  rotateHex, ROWS_PER_INDEX, TOO_MUCH_SYNERGY
} from "@services/Constants"
import {BingoOptions, Square, Synergy} from "@services/bingoInterfaces"
import seedrandom from "seedrandom"
import {Blankable, clamp, inclusiveFullRange, isNotDefined, Nullable, range, Undefinable} from "@utils/Utility"


export class BingoBoard {

  language: string
  mode: string
  seed: string

  profile: Profile

  baselineTime: number
  timePerDifficulty: number
  minimumSynergy: number
  maximumSynergy: number
  maximumIndividualSynergy: number
  maximumSpill: number
  initialOffset: number
  maximumOffset: number

  goals: Square[]

  rowTypeTimeSave: Map<string, number>
  synergyFilters: Map<string, string>

  goalsByName: Map<string, Square>

  board: Map<number, Square>


  constructor(bingoGoals: Square[], options?: BingoOptions) {
    this.language = options?.language ?? "name"
    this.mode = options?.mode ?? "normal"
    this.seed = options?.seed ?? Math.ceil(999999 * Math.random()).toString()

    this.profile = MODE_TO_PROFILE.get(this.mode) ?? NORMAL_PROFILE

    this.baselineTime = options?.baselineTime ?? this.profile.baselineTime
    this.timePerDifficulty = options?.timePerDifficulty ?? this.profile.timePerDifficulty
    this.minimumSynergy = options?.minimumSynergy ?? this.profile.defaultMinimumSynergy
    this.maximumSynergy = options?.maximumSynergy ?? this.profile.defaultMaximumSynergy
    this.maximumIndividualSynergy = options?.maximumIndividualSynergy ?? this.profile.defaultMaximumIndividualSynergy
    this.maximumSpill = options?.maximumSpill ?? this.profile.defaultMaximumSpill
    this.initialOffset = options?.initialOffset ?? this.profile.defaultInitialOffset
    this.maximumOffset = options?.maximumOffset ?? this.profile.defaultMaximumOffset

    this.rowTypeTimeSave = window.bingoList.rowTypes ?? new Map()
    this.synergyFilters = window.bingoList.synergyFilters ?? new Map()
    this.goals = []
    this.board = new Map()

    for (const index of inclusiveFullRange(1, DIFFICULTIES)) {
      for (const g of window.bingoList[index]) {
        const goal: Square = window.bingoList[index][g]
        if (isNotDefined(goal.difficulty)) {
          goal.difficulty = index
        }

        if (isNotDefined(goal.time)) {
          goal.time = goal.difficulty * this.timePerDifficulty
        }

        if (isNotDefined(goal.id)) {
          goal.id = goal.name
        }

        if (isNotDefined(goal.types)) {
          goal.types = []
        } else if (Array.isArray(goal.types)) {
          const objTypes = []
          for (const t of range(goal.types.length)) {
            objTypes[goal.types[t]] = 1
          }
          goal.types = objTypes
        }
      }
    }


    for (const index of inclusiveFullRange(1, DIFFICULTIES)) {
      this.goals = this.goals.concat(window.bingoList[index])
    }

    this.goals = this.goals.stableSort((a: Square, b: Square) => {
      if (a === undefined || b === undefined) {
        return
      }

      const timeDiff = a.time! - b.time!
      if (timeDiff !== 0) {
        return timeDiff
      }

      if (a.id! > b.id!) {
        return 1
      }
      else if (a.id! < b.id!) {
        return -1
      }
      else {
        return 0
      }
    })

    this.goalsByName = new Map(this.goals.map((goal: Square) => [goal.name!, goal]))

    seedrandom(this.seed)
  }

  generate() {}

  makeMissions() {
    for (const index of inclusiveFullRange(1, 5)) {
      const difficulty = 1 + ((index - 1) * 5) + Math.floor(Math.random() * 5)
      this.board.set(POPULATION_ORDER[index - 1], {
        difficulty,
        desiredTime: difficulty * this.timePerDifficulty
      })
    }

    for (const outerIndex of inclusiveFullRange(1, 5)) {
      const position = POPULATION_ORDER[outerIndex - 1]

      let isGoalCalculated = false
      let calculatedGoal: Blankable<Square>
      const desiredDifficulty = this.board.get(position)?.difficulty ?? 0
      const desiredTime = desiredDifficulty * this.timePerDifficulty
      for (const offset of inclusiveFullRange(this.initialOffset, this.maximumOffset)) {
        const minTime = desiredTime - offset
        const maxTime = desiredTime + offset
        const goalsAtTime = this.getGoalsInTimeRange(minTime, maxTime).shuffled()

        for (const innerIndex of range(goalsAtTime.length)) {
          const goal = goalsAtTime[innerIndex]
          if (this.hasGoalOnBoard(goal)) {
            continue
          }

          calculatedGoal = {
            goal,
          }
          isGoalCalculated = true
          break
        }
      }

      if (!isGoalCalculated ?? isNotDefined(calculatedGoal?.goal)) {
        return false
      }

      const specifiedGoal: Square = this.board.getDefined(position)

      specifiedGoal.types = calculatedGoal?.goal?.types
      specifiedGoal.subTypes = calculatedGoal?.goal?.subTypes
      specifiedGoal.rowTypes = calculatedGoal?.goal?.rowTypes
      specifiedGoal.name = calculatedGoal?.goal?.languageName?.get(this.language) ?? calculatedGoal?.goal?.name
      specifiedGoal.id = calculatedGoal?.goal?.id
      specifiedGoal.time = calculatedGoal?.goal?.time
      specifiedGoal.goal = calculatedGoal?.goal
      specifiedGoal.synergy = calculatedGoal?.synergy
    }

    return this.board
  }

  makeCard() {
    this.board = this.generateMagicSquare()

    const populationOrder = this.generatePopulationOrder()
    for (const index of inclusiveFullRange(1, HEXS)) {
      const nextPosition = populationOrder[index - 1]

      let calculatedGoal: Square | boolean = this.chooseGoalForPosition(nextPosition)
      if (!calculatedGoal) {
        return false
      } else {
        calculatedGoal = (calculatedGoal! as Square)
        const specifiedGoal: Square = this.board.getDefined(nextPosition)

        specifiedGoal.types = calculatedGoal?.goal?.types
        specifiedGoal.subTypes = calculatedGoal?.goal?.subTypes
        specifiedGoal.rowTypes = calculatedGoal?.goal?.rowTypes
        specifiedGoal.name = calculatedGoal?.goal?.languageName?.get(this.language) ?? calculatedGoal?.goal?.name
        specifiedGoal.id = calculatedGoal?.goal?.id
        specifiedGoal.time = calculatedGoal?.goal?.time
        specifiedGoal.goal = calculatedGoal?.goal
        specifiedGoal.synergy = calculatedGoal?.synergy
      }
    }

    return this.board
  }

  generateMagicSquare() {
    const newHex: number[] = JSON.parse(JSON.stringify(magicHex))
    let copiedHex = []

    const flip = Math.floor(Math.random() * 2)
    if (flip > 0) {
      copiedHex = JSON.parse(JSON.stringify(newHex))
      for (const index of range(HEXS)) {
        newHex[index] = copiedHex[flipHex[index] - 1]
      }
    }

    let rotate = Math.floor(Math.random() * 6)
    for (; rotate > 0; rotate--) {
      copiedHex = JSON.parse(JSON.stringify(newHex))
      for (const index of range(HEXS)) {
        newHex[index] = copiedHex[rotateHex[index] - 1]
      }
    }

    let newDifference = 0
    let maxDifference = 0
    const differenceMap = new Map()
    for (const index of inclusiveFullRange(1, HEXS)) {
      do {
        newDifference = clamp(Math.floor((index - 1) * 25.1 / HEXS) +
          (Math.floor(Math.random() * 3) - 1),
          1, 25)
      } while (newDifference <= maxDifference)
      differenceMap.set(index, newDifference)
      maxDifference = newDifference
    }

    for (const index of range(HEXS)) {
      newHex[index] = differenceMap.get(newHex[index])
    }

    const magicSquare: Map<number, Square> = new Map()
    for (const index of inclusiveFullRange(1, HEXS)) {
      const difficulty = newHex[index - 1]
      magicSquare.set(index, {
        difficulty,
        desiredTime: difficulty * this.timePerDifficulty
      })
    }

    return magicSquare
  }

  chooseGoalForPosition(position: number): Square | boolean {
    const desiredDifficulty: number = this.board.get(position)?.difficulty!
    const desiredTime = desiredDifficulty * this.timePerDifficulty
    let bestGoals = []
    for (const offset of inclusiveFullRange(this.initialOffset, this.maximumOffset)) {
      const minTime = desiredTime - offset
      const maxTime = desiredTime + offset
      const goalsAtTime = this.getGoalsInTimeRange(minTime, maxTime)

      for (const innerIndex of range(goalsAtTime.length)) {
        const goal = goalsAtTime[innerIndex]
        if (this.hasGoalOnBoard(goal)) {
          continue
        }

        if (this.mode === "blackout") {
          if (this.hasConflictsOnBoard(goal)) {
            continue
          }
        }

        const synergies = this.checkLine(position, goal)
        synergies.weightedSynergy += offset
        if (this.maximumSynergy >= synergies.maxSynergy && synergies.minSynergy >= this.minimumSynergy) {
          bestGoals.push({
            goal,
            synergy: synergies.weightedSynergy
          })
        }
      }
    }

    if (bestGoals.isEmpty()) {
      return false
    }

    const cutoff: number = 0.1 + Math.min(...bestGoals.map(goal => goal.synergy))

    bestGoals = bestGoals.filter(goal => goal.synergy < cutoff).shuffled()

    return bestGoals[0] ?? false
  }

  generatePopulationOrder(): number[] {
    return range(HEXS).shuffled()
  }

  getGoalsInTimeRange(minTime: number, maxTime: number): Square[] {
    return this.goals.filter((goal: Square) => {
      return minTime <= goal.time! && goal.time! <= maxTime
    })
  }

  hasGoalOnBoard(goal: Square) {
    for (const index of inclusiveFullRange(1, HEXS)) {
      if (this.board.get(index) && this.board.get(index)?.id === goal.id) {
        return true
      }
    }
    return false
  }

  hasConflictsOnBoard(goal: Square): boolean {
    for (const index of inclusiveFullRange(1, HEXS)) {
      const square = this.board.getDefined(index)
      if (square.goal) {
        const squares = [goal, square.goal]
        const synergy: number = this.evaluateSquares(squares)

        if (synergy >= TOO_MUCH_SYNERGY) {
          return true
        }
      }
    }
    return false
  }

  getOtherSquares(row: string, position: number): Square[] {
    const rowIndices = INDICES_PER_ROW.getDefined(row).filter((index: number) => index !== position)

    // ! THIS IS BOARD?
    const board = this

    return rowIndices.map((index: number) => board.board.getDefined(index))
  }

  checkLine(position: number, potentialGoal: Square) {
    const rows: string[] = ROWS_PER_INDEX.getDefined(position)
    let maxSynergy: number = 0
    let minSynergy: number = TOO_MUCH_SYNERGY
    let weightedSynergy: number = 0

    for (const rowIndex of range(rows.length)) {
      const row = rows[rowIndex]

      const potentialSquare = JSON.parse(JSON.stringify(potentialGoal))
      potentialSquare.desiredTime = this.board.get(position)?.desiredTime

      const potentialRow: Square[] = this.getOtherSquares(row, position)
      potentialRow.push(potentialSquare)

      const effectiveRowSynergy = this.evaluateSquares(potentialRow, row)
      maxSynergy = Math.max(maxSynergy, effectiveRowSynergy)
      minSynergy = Math.min(minSynergy, effectiveRowSynergy)
      weightedSynergy += Math.pow(effectiveRowSynergy, 2)
    }

    return {
      minSynergy,
      maxSynergy,
      weightedSynergy: Math.sqrt(weightedSynergy)
    }
  }

  evaluateSquares(squares: Square[], row: Nullable<string> = null): number {
    const goalIds: string[] = squares.map((goal: Square) => goal.id!)

    if (goalIds.hasDuplicates()) {
      return TOO_MUCH_SYNERGY
    }

    const synergiesForSquares = this.calculateSynergiesForSquares(squares)

    return this.calculateEffectiveSynergyForSquares(synergiesForSquares, row!)
  }

  calculateSynergiesForSquares(squares: Square[]): Synergy {
    const typeSynergies: Map<string, number[]> = new Map()
    const subTypeSynergies: Map<string, number[]> = new Map()
    const rowTypeSynergies: Map<string, number[]> = new Map()
    const timeDifferences: number[] = []

    for (const m of range(squares.length)) {
      const square = squares[m]
      this.mergeTypeSynergies(typeSynergies, square.types ?? [])
      this.mergeTypeSynergies(subTypeSynergies, square.subTypes ?? [])
      this.mergeTypeSynergies(rowTypeSynergies, square.rowTypes ?? [])
      if (square.time !== undefined && square.desiredTime !== undefined) {
        timeDifferences.push(square.desiredTime - square.time)
      }
    }

    return {
      typeSynergies,
      subTypeSynergies,
      rowTypeSynergies,
      goals: squares,
      timeDifferences
    }
  }

  mergeTypeSynergies(typeSynergies: Map<string, number[]>, newTypeSynergies: number[]) {
    for (const type of newTypeSynergies) {
      if (!typeSynergies.get(type)) {
        typeSynergies.set(type, [])
      }

      typeSynergies.get(type)?.push(newTypeSynergies[type])
    }
  }

  calculateCombinedTypeSynergies(synergiesForSquares: Synergy): Map<string, number[]> {
    const typeSynergies = synergiesForSquares.typeSynergies
    const subTypeSynergies = synergiesForSquares.subTypeSynergies
    const combinedTypeSynergies: Map<string, number[]> = new Map()

    for (const type in typeSynergies) {
      if (type in subTypeSynergies) {
        combinedTypeSynergies.set(type, typeSynergies.get(type)?.concat(subTypeSynergies.getDefined(type))!)
      }
      else {
        combinedTypeSynergies.set(type, typeSynergies.getDefined(type))
      }
    }
    return combinedTypeSynergies
  }

  filterRowTypeSynergies(synergiesForSquares: Synergy, row: string): Map<string, number> {
    const rowTypeSynergies: Map<string, number[]> = new Map()

    for (const rowType of synergiesForSquares.rowTypeSynergies) {
      const rowTypeSynergy: number[] = synergiesForSquares.rowTypeSynergies.getDefined(rowType)
      // - Changed this to .length but original does not make sense
      if (!row ?? rowTypeSynergy.length < INDICES_PER_ROW.getDefined(row).length) {
        continue
      }

      let rowTypeCost = 0
      for (const index of range(rowTypeSynergy.length)) {
        rowTypeCost += rowTypeSynergy[index]
      }
      if (this.rowTypeTimeSave.getDefined(rowType) > rowTypeCost) {
        rowTypeSynergies.set(rowType, this.rowTypeTimeSave.getDefined(rowType) - rowTypeCost)
      }
    }

    return rowTypeSynergies
  }

  calculateEffectiveTypeSynergies(typeSynergies: Map<string, number[]>): Map<string, number[]> {
    const effectiveTypeSynergies: Map<string, number[]> = new Map()

    for (const type of typeSynergies.keys()) {
      const synergies: number[] = typeSynergies.getDefined(type)
      const effectiveSynergies = this.filterSynergyValuesForType(type, synergies)
      if (effectiveSynergies.length > 0) {
        effectiveTypeSynergies.set(type, effectiveSynergies)
      }
    }

    return effectiveTypeSynergies
  }

  filterSynergyValuesForType(type: string, synergies: number[]): number[] {
    synergies = synergies.sortNumerically()
    const filter: string = this.synergyFilters.get(type) ?? ""

    if (/^min/.test(filter)) {
      const count = Number(filter.split(" ")[1])
      return synergies.slice(0, count)
    }
    else if (/^max/.test(filter)) {
      const count = Number(filter.split(" ")[1])
      synergies.reverse()
      return synergies.slice(0, count)
    }
    else {
      return synergies.slice(0, -1)
    }
  }

  calculateEffectiveSynergyForSquares(synergiesForSquares: Synergy, row: string): number {
    const typeSynergies = this.calculateCombinedTypeSynergies(synergiesForSquares)
    const rowTypeSynergies = this.filterRowTypeSynergies(synergiesForSquares, row)
    const effectiveTypeSynergies = this.calculateEffectiveTypeSynergies(typeSynergies)

    let rowSynergy = 0
    for (const type of effectiveTypeSynergies) {
      const synergies: number[] = effectiveTypeSynergies.getDefined(type)
      for (const index of range(synergies.length)) {
        if (synergies[index] > this.maximumIndividualSynergy) {
          return TOO_MUCH_SYNERGY
        }
        rowSynergy += synergies[index]
      }
    }

    for (const rowType of rowTypeSynergies) {
      rowSynergy += rowTypeSynergies.getDefined(rowType)
    }

    const timeDifferences = synergiesForSquares.timeDifferences
    for (const index of range(timeDifferences.length)) {
      const timeDifference = timeDifferences[index]
      rowSynergy += timeDifference
    }

    return rowSynergy
  }

}
