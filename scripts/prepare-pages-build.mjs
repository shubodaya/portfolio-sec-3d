import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const distDir = resolve(process.cwd(), "dist");

await mkdir(distDir, { recursive: true });
await copyFile(resolve(distDir, "index.html"), resolve(distDir, "404.html"));
await writeFile(resolve(distDir, ".nojekyll"), "");
