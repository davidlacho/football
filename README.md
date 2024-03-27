# Soccer Analysis Project

This project demonstrates a TypeScript application that analyzes soccer match results to provide insights such as the number of wins for a team. It showcases two primary design patterns: inheritance and composition, alongside various TypeScript features to achieve a robust and scalable application structure.

## Overview

The application reads match data from a CSV file, processes the data to analyze team performances, and outputs the analysis through different mediums such as the console and HTML reports. It is structured around the core concepts of Analyzers, Readers, and Reporters to modularize data reading, data analysis, and output formatting functionalities, respectively.

### Inheritance
Inheritance is a fundamental concept in object-oriented programming (OOP) that allows a class to inherit properties and methods from another class. The class that inherits the properties and methods is usually called the child or subclass, while the class from which the properties and methods are inherited is known as the parent or superclass. This is often called an "is-a" relationship, where the child "is a" form of the parent.

#### Example of Inheritance

Inheritance is utilized in the project to define a generic CSV file reader that can be extended to read different types of data. The abstract class `CsvFileReader<T>` serves as a base class that reads data from a CSV file and parses each row into an array of strings. Subclasses of `CsvFileReader` are required to implement the `mapRow` method to convert these string arrays into a specific data structure (e.g., `MatchData`). This class is generic, meaning it can adapt to various data structures, depending on the type parameter `T`.

```typescript
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
```

The `CsvFileReader` class defines a `read` method that loads a CSV file, splits it into rows, and then maps each row into a specific data structure through the `mapRow` method. The `mapRow` method is abstract, requiring subclasses to provide their own implementation to define how each row should be processed and converted.

The `MatchReader` class extends `CsvFileReader` and provides a specific implementation of the `mapRow` method to parse soccer match data into a `MatchData` tuple:

```typescript
// Subclass MatchReader
import { CsvFileReader } from "./CsvFileReader";
import { dateStringToDate } from "../utils";
import { MatchResult } from "../MatchResult";

type MatchData = [Date, string, string, number, number, MatchResult, string];

export class MatchReader extends CsvFileReader<MatchData> {
  mapRow(row: string[]): MatchData {
    return [
      dateStringToDate(row[0]),
      row[1],
      row[2],
      parseInt(row[3]),
      parseInt(row[4]),
      row[5] as MatchResult,
      row[6],
    ];
  }
}
```

### Composition

Composition is a design principle in object-oriented programming (OOP) where a class is composed of one or more objects of other classes in order to develop more complex functionality. This design principle is often summarized by the phrase "has-a" relationship, as opposed to the "is-a" relationship of inheritance. In composition, one class includes instances of other classes as part of its state or behavior.

#### Example of Composition

The `Summary` class in the project is a prime example of the composition design pattern in action. Instead of inheriting behavior from a superclass, it composes its functionality by combining different objects that implement certain interfaces. This approach allows the `Summary` class to leverage different analyzers and output targets without being tightly coupled to their concrete implementations.

The `Summary` class is designed to generate reports based on the analysis of match data. It does so by utilizing two main components:

1. **Analyzer (`Analyzer` Interface):** Any class that implements the `Analyzer` interface can analyze match data and return a summary string. The `WinsAnalysis` class is an example that counts the number of wins for a specific team.
2. **Output Target (`OutputTarget` Interface):** Any class that implements the `OutputTarget` interface can output the generated report in a specific format. Examples include the `ConsoleReport` class, which prints the report to the console, and the `HTMLReport` class, which generates an HTML file.


```typescript
export class Summary {
  constructor(public analyzer: Analyzer, public outputTarget: OutputTarget) {}

  buildAndPrintReport(matches: MatchData[]): void {
    const report = this.analyzer.run(matches);
    this.outputTarget.print(report);
  }
}
```

In this setup, the `Summary` class does not need to know the details of how the analysis is performed or how the report is displayed. This separation of concerns is achieved through composition, making the code more modular, flexible, and easier to maintain. By simply passing different analyzers and output targets to the `Summary` constructor, we can easily change the behavior of reporting without modifying the `Summary` class itself. This approach highlights the power of composition in creating flexible and decoupled systems, enabling easy extension and modification of application behavior.

### TypeScript Features Used

Below are the TypeScript features used in this project with examples from the provided codebase to illustrate how each feature is implemented:

- **Interfaces:** Interfaces define contracts within the code. For example, the `DataReader` interface ensures that any class implementing it will have a `read` method and a `data` property.

  ```typescript
  interface DataReader {
    read(): void;
    data: string[][];
  }
  ```

- **Abstract Classes:** Abstract classes provide a base structure for other classes to extend but cannot be instantiated themselves. The `CsvFileReader<T>` class is an abstract class that defines a generic method for reading CSV files.

  ```typescript
  export abstract class CsvFileReader<T> {
    constructor(public filename: string) {}
    data: T[] = [];
    abstract mapRow(row: string[]): T;
  }
  ```

- **Generics:** Generics allow classes and functions to handle multiple types while maintaining type safety. The `CsvFileReader` class uses generics to work with any type of data model.

  ```typescript
  export abstract class CsvFileReader<T> {}
  ```

- **Enums:** Enums provide a set of named constants. `MatchResult` is an enum used to represent the result of a match, making the code more readable.

  ```typescript
  export enum MatchResult {
    HomeWin = "H",
    AwayWin = "A",
    Draw = "D",
  }
  ```

- **Type Alias:** Type aliases create new names for existing types, which is especially useful for complex types. `MatchData` is a type alias for a tuple representing a row of match data.
  ```typescript
  export type MatchData = [
    Date,
    string,
    string,
    number,
    number,
    MatchResult,
    string
  ];
  ```