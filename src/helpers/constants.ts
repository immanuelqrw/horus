export enum Color {
  HEX_HOVER = "rgba(255,255,255,0.3)",
  HEX_UNLIT = "rgba(0,0,0,.5)",
  ROW_HOVER = "rgba(255,255,255,0.3)",
  ROW_UNLIT = "rgba(0,0,0,.5)",
  NORMAL = ""
}

const invertObject = (obj: Map<any, any>): Map<any, any> => {
  const ret = new Map()

  Object.keys(obj).forEach((key: any) => {
    ret.set([obj.get(key)], key)
  })

  return ret
}

export const INDICES_PER_ROW: Map<string, number[]> = new Map([
  ["RO",  [1, 2, 3]],
  ["RY",  [2, 6, 11, 16]],
  ["RG",  [1, 5, 10, 15, 19]],
  ["RB",  [2, 5, 9, 13]],
  ["RP",  [1, 4, 8]],
  ["OY",  [3, 7, 12]],
  ["OG",  [7, 11, 15, 18]],
  ["OB",  [3, 6, 10, 14, 17]],
  ["OP",  [4, 5, 6, 7]],
  ["YG",  [12, 16, 19]],
  ["YB",  [13, 14, 15, 16]],
  ["YP",  [8, 9, 10, 11, 12]],
  ["GB",  [17, 18, 19]],
  ["GP",  [4, 9, 14, 18]],
  ["BP",  [8, 13, 17]]
])

export const ROWS_PER_INDEX: Map<number, string[]> = invertObject(INDICES_PER_ROW)



/* Bingo generation scripts */

/*
     1  2 3
   4  5  6  7
 8  9  10 11 12
  13 14 15 16
    17 18 19
  */

export const magicHex: number[] = [
    3, 17, 18,
  19, 7, 1, 11,
 16, 2, 5, 6, 9,
  12, 4, 8, 14,
   10, 13, 15
]

export const rotateHex: number[] = [
    8, 4, 1,
  13, 9, 5, 2,
17, 14, 10, 6, 3,
  18, 15, 11, 7,
    19,16, 12
]

export const flipHex: number[] = [
    3, 2, 1,
   7, 6, 5, 4,
12, 11, 10, 9, 8,
 16, 15, 14, 13,
   19, 18, 17
]

export const POPULATION_ORDER: number[] = [1, 5, 10, 15, 19]

export enum SelectedHexClass {
  GREEN = "SelectedGreenHex",
  RED = "SelectedRedHex"
}


export interface Profile {
  defaultMinimumSynergy: number
  defaultMaximumSynergy: number
  defaultMaximumIndividualSynergy: number
  defaultMaximumSpill: number
  defaultInitialOffset: number
  defaultMaximumOffset: number
  baselineTime: number
  timePerDifficulty: number
}

/* From SRL OoT Bingo Generator */
/* Modified for hexbingo and non-oot goal lists */

export const TOO_MUCH_SYNERGY: number = 100
export const SQUARES_PER_ROW: number = 5

export const DEFAULT_PROFILE: Profile = {
  defaultMinimumSynergy: -3,
  defaultMaximumSynergy: 7,
  defaultMaximumIndividualSynergy: 4.5,
  defaultMaximumSpill: 2,
  defaultInitialOffset: 0.1,
  defaultMaximumOffset: 2,
  baselineTime: 28.25,
  timePerDifficulty: 0.75
}

export const NORMAL_PROFILE: Profile = {
  defaultMinimumSynergy: DEFAULT_PROFILE.defaultMinimumSynergy,
  defaultMaximumSynergy: DEFAULT_PROFILE.defaultMaximumSynergy,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: DEFAULT_PROFILE.defaultInitialOffset,
  defaultMaximumOffset: DEFAULT_PROFILE.defaultMaximumOffset,
  baselineTime: DEFAULT_PROFILE.baselineTime,
  timePerDifficulty: DEFAULT_PROFILE.timePerDifficulty
}

export const SHORT_PROFILE: Profile = {
  defaultMinimumSynergy: DEFAULT_PROFILE.defaultMinimumSynergy,
  defaultMaximumSynergy: 3,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: DEFAULT_PROFILE.defaultInitialOffset,
  defaultMaximumOffset: DEFAULT_PROFILE.defaultMaximumOffset,
  baselineTime: 12,
  timePerDifficulty: 0.5
}

export const BLACKOUT_PROFILE: Profile = {
  defaultMinimumSynergy: -10,
  defaultMaximumSynergy: 10,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: 2,
  defaultMaximumOffset: 6,
  baselineTime: DEFAULT_PROFILE.baselineTime,
  timePerDifficulty: DEFAULT_PROFILE.timePerDifficulty
}

export const SHORT_BLACKOUT_PROFILE: Profile = {
  defaultMinimumSynergy: -4,
  defaultMaximumSynergy: 4,
  defaultMaximumIndividualSynergy: DEFAULT_PROFILE.defaultMaximumIndividualSynergy,
  defaultMaximumSpill: DEFAULT_PROFILE.defaultMaximumSpill,
  defaultInitialOffset: 2,
  defaultMaximumOffset: 6,
  baselineTime: 12,
  timePerDifficulty: 0.5
}

export const MODE_TO_PROFILE: Map<string, Profile> = new Map([
  ["short", SHORT_PROFILE],
  ["blackout", BLACKOUT_PROFILE]
])

export const HEXS: number = 19
export const DIFFICULTIES: number = 25
