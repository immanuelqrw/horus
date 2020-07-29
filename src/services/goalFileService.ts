import { GoalFile } from "@services/bingo/goalFile"
import * as yaml from "js-yaml"

export class GoalFileService {

  static load(gameAbbreviation: string): GoalFile {
    const filename: string = `${gameAbbreviation}.yml`

    return yaml.safeLoad(filename)
  }

  static write(goalFile: GoalFile): string {
    return yaml.safeDump(goalFile)
  }

}
