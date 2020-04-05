import * as fs from "fs";
import * as yaml from 'js-yaml';

import {BingoBoard} from "./bingoBoard";
import {Entry} from "./entry";
import {Goal} from "./goal";


export class GoalConverter {

  static parseBingoYAML(file: string): BingoBoard {
    const bingo: Array<Entry> = yaml.safeLoad(fs.readFileSync(file, "utf8"));

    const bingoGoals: BingoBoard = [];
    bingo.forEach(function (entry: Entry) {
      const difficulty: number = entry.difficulty;
      const goal: Goal = {
        name: entry.name,
        types: entry.types
      };

      if (bingoGoals[difficulty] === undefined) {
        bingoGoals[difficulty] = [goal];
      } else {
        bingoGoals[difficulty].push(goal);
      }
    });

    return bingoGoals;
  }
}
