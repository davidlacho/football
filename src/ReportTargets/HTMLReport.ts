import { OutputTarget } from "../Summary";
import fs from "fs";

export class HTMLReport implements OutputTarget {
  print(report: string): void {
    const html = `
        <div>
            <h1>Analysis Output</h1>
            <div>${report}</div>
        </div>
        `;
    fs.writeFileSync("./report.html", html);
  }
}
