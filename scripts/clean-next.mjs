import { rmSync } from "node:fs";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");

rmSync(nextDir, { recursive: true, force: true });
console.log("Removed .next — restart the dev server (npm run dev).");
