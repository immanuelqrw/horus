import {Nullable} from "@utils/Utility"

export interface Goal {
  name: string
  types: string[]
  difficulty?: number
}

export interface Bingo {
  goals: (Nullable<Goal>)[]
  rules: string
  tips: string
}

export interface BingoOptions {
  language?: string
  mode: string
  seed: string
  baselineTime?: number
  timePerDifficulty?: number
  minimumSynergy?: number
  maximumSynergy?: number
  maximumIndividualSynergy?: number
  maximumSpill?: number
  initialOffset?: number
  maximumOffset?: number
}

export interface Board {

}

export interface Square {
  id?: string
  name?: string
  goal?: Square
  types?: number[]
  subTypes?: number[]
  rowTypes?: number[]
  time?: number
  desiredTime?: number
  difficulty?: number
  synergy?: number
  languageName?: Map<string, string>
}

export interface Synergy {
  typeSynergies: Map<string, number[]>
  subTypeSynergies: Map<string, number[]>
  rowTypeSynergies: Map<string, number[]>
  goals: Square[]
  timeDifferences: number[]
}
