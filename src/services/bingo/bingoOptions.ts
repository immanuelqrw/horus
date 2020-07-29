export interface BingoOptions {
  mode: string
  seed: string
  language?: string
  baselineTime?: number
  timePerDifficulty?: number
  minimumSynergy?: number
  maximumSynergy?: number
  maximumIndividualSynergy?: number
  maximumSpill?: number
  initialOffset?: number
  maximumOffset?: number
}
