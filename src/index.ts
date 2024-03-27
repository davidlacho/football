import { MatchReader } from "./MatchReader";
import { CsvFileReader } from "./CsvFileReader";
import { Summary } from "./Summary";
import { WinsAnalysis } from "./Analyzers/WinsAnalysis";
import { ConsoleReport } from "./ReportTargets/ConsoleReport.js";
import { HTMLReport } from "./ReportTargets/HTMLReport";

const reader = new CsvFileReader("football.csv");
const matchReader = new MatchReader(reader);
matchReader.load();

const winsAnalysis = new WinsAnalysis("Man United");

// Printing to console
const summary = new Summary(winsAnalysis, new ConsoleReport());
summary.buildAndPrintReport(matchReader.matches);

// Swapping out the Output Target
const htmlSummary = new Summary(winsAnalysis, new HTMLReport());
htmlSummary.buildAndPrintReport(matchReader.matches);

// With Static Methods
const staticMatchReader = MatchReader.fromCsv("football.csv");
staticMatchReader.load();
const staticSummary = Summary.winsAnalysisWithHtmlReport("Bournemouth");
staticSummary.buildAndPrintReport(staticMatchReader.matches);

// import { MatchResult } from "./MatchResult.ts";

// let manUnitedWins = 0;

// for (let match of matchReader.matches) {
//   if (
//     (match[1] === "Man United" && match[5] === MatchResult.HomeWin) ||
//     (match[2] === "Man United" && match[5] === MatchResult.AwayWin)
//   ) {
//     manUnitedWins += 1;
//   }
// }

// console.log(`Man United won ${manUnitedWins} games`);
