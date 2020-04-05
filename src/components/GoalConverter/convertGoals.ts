import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import {BingoBoard} from "./bingoBoard";
import {GoalConverter} from "./goalConverter";

export function convertGoals(encoding: string = "utf8") {
  const filenames: string[] = glob.sync("../../assets/raw-goals/*.yml");

  filenames.forEach((filename) => {
    const bingoName: string = path.parse(filename).name;
    console.log(bingoName);

    const bingoBoard: BingoBoard = GoalConverter.parseBingoYAML(filename);
    const BINGO_BOARD: string = `var bingoList = ${JSON.stringify(bingoBoard)};`;

    const rulesFile: string = `${bingoName}.rules.html`;
    let RULES: string = "";
    if (fs.existsSync(rulesFile)) {
      RULES = fs.readFileSync(rulesFile, encoding);
    }

    const tipsFile: string = `${bingoName}.tips.html`;
    let TIPS: string = "";
    if (fs.existsSync(tipsFile)) {
      TIPS = fs.readFileSync(tipsFile, encoding);
    }

    const RULES_ENTRY: string = `var bingoRules = "${RULES}";`;
    const TIPS_ENTRY: string = `var bingoTips = "${TIPS}";`;

    const TEMPLATE = `${BINGO_BOARD}\n${RULES_ENTRY}\n${TIPS_ENTRY}`;

    fs.writeFileSync(`../../assets/goals/${bingoName}.js`, TEMPLATE);
  });
}