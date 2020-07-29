import { Goal } from "@services/bingo/goal"


export class BoardGenerationService {

  static randomizeGoals(seed: string, goals: Goal[]) {
    const mod: number = BoardGenerationService.convertSeedToMod(seed)

    return BoardGenerationService.scrambleGoals(mod, goals)
  }

  private static convertSeedToMod(seed: string): number {
    // - Convert seed into integer
    return 0
  }

  private static scrambleGoals(mod: number, goals: Goal[]): Goal[] {
    // - Scramble goals based on mod
    return []
  }

}
