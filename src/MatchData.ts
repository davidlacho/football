// Using tuples to describe a single row of a CSV file
// We had to convert the strings from CSV to appropriate type
// We could then describe the rows into a tuple

import { MatchResult } from "./MatchResult.ts";
export type MatchData = [
  Date,
  string,
  string,
  number,
  number,
  MatchResult,
  string
];
