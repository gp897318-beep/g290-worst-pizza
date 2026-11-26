// The Worst Pizza Topping — a make.fun entry.
// Writes one one-line pitch for a terrible pizza topping (<= 200 characters)
// to /output/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The winning line, picked from 10 compared variants (see worst-pizza-variants.md).
// The chef's special is topped with expired yogurt: tangy and alive, and the
// joke turns on the topping being treated like a legal hazard — banned within
// fifty feet of a school. A real topping, genuinely awful, sold deadpan.
const LINE =
  "Our chef's special pizza is topped with expired yogurt — tangy, alive, and legally not allowed within fifty feet of a school.";

// The gate: 1 to 200 characters, not only white space.
function checkGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, gate is 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
}

// Grader runs with /output; local runs may set MAKEFUN_OUTPUT_DIR.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
checkGate(LINE);
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");
// Round-trip guard: the file the judge reads must be byte-identical to the
// line above — no trailing newline, no encoding drift.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt differs from the intended line after write");
}
console.log(`wrote ${[...LINE].length}-character entry to ${outPath}`);
