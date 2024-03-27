// Generic Class because we want to configure the
// Types in this class definition on the fly

import fs from "fs";
export abstract class CsvFileReader<T> {
  constructor(public filename: string) {}

  data: T[] = [];

  read(): void {
    this.data = fs
      .readFileSync(this.filename, { encoding: "utf-8" })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",");
      })
      .map(this.mapRow);
  }

  abstract mapRow(row: string[]): T;
}
